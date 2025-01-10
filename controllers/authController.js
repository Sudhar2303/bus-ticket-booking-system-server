
const { setResponseBody } = require('../utils/responseFormatter')
const { setTokenCookie, generateToken } = require('../utils/tokenService')
const { findUserByEmail, createUser } = require('../services/userService')
const { validationResult } = require('express-validator')

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

module.exports = {
    signup
}
