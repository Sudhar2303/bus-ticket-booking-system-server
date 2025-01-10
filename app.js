require('dotenv').config()
const express = require('express')
const app = express()


const connect = require('./database/connection')

app.get('/', (request, response) => {
    response.status(200).send({ message : "Server running successfully"})
})

connect() 
    .then( () => {
        try{
            app.listen(process.env.PORT, console.log(`Server is running at http://localhost:${process.env.PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })
