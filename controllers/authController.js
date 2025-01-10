const bcrypt = require('bcrypt')

const { setResponseBody } = require('../utils/responseFormatter')
const { setTokenCookie, generateToken, clearTokenCookie } = require('../utils/tokenService')
const { findUserByEmail, createUser } = require('../services/userService')
const { validationResult } = require('express-validator')
const { request } = require('express')

const signup = async(request,response) => {
    const { name, email, password } = request.body
    try
    {
        const errors = validationResult(request)

        if(!errors.isEmpty()) {
            return response.status(400).send(setResponseBody(errors.array()[0].msg,"validation_error",null))
        }

        const existingUser = await findUserByEmail(email)
        if(existingUser)
            return response.status(409).send(setResponseBody("User already exist","existing_user",null)) 

        const newUser = await createUser( name, email, password )

        const token = generateToken(newUser)
        setTokenCookie(response, token)

        let responseData = {
            name : newUser.name,
            username : newUser.username, 
            email: newUser.email
        }

        response.status(201).send(setResponseBody("User created Successfully", null, responseData))
    }
    catch(error)
    {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

const login = async(request, response) => {
    const { email, password } = request.body
    try
    {
        const errors = validationResult(request)

        if(!errors.isEmpty()) {
            return response.status(400).send(setResponseBody(errors.array()[0].msg,"validation_error",null))
        }

        const existingUser = await findUserByEmail(email)
        if(!existingUser) {
            return response.status(401).send(setResponseBody("Invalid email address", "invalid_email", null))
        }

        const validatePassword = await bcrypt.compare(password, existingUser.password)
        if(!validatePassword) {
            return response.status(401).send(setResponseBody("Invalid password", "invalid_password", null))
        }

        const token = generateToken(existingUser)
        setTokenCookie(response, token)

        let responseData = {
            name : existingUser.name,
            username : existingUser.username, 
            email: existingUser.email
        }

        response.status(200).send(setResponseBody("Logged in Successfully", null, responseData))
    }
    catch(error)
    {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

const logout = async(request, response) =>{
    try{
        const userCookie = request.cookies
        if(Object.keys(userCookie).length != 0)
        {
            if(userCookie.SessionID)
            {
                clearTokenCookie(response)
                return response.status(201).send(setResponseBody("User has been Logout", null, null))
            }
            return response.status(400).send(setResponseBody("Invalid operation: No token found", null, null));
        }
        return response.status(204).send(setResponseBody("No active session found", null, null));
    }
    catch(error)
    {
        return response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

module.exports = {
    signup,
    login,
    logout
}
