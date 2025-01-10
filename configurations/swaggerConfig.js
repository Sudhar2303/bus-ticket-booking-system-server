const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
      openapi: '3.1.0', 
      info: {
        title: 'Bus Ticket Booking',
        version: '1.0.0',
        description: 'API documentation for Bus Ticket Booking',
        contact: {
          name: 'Sudharsanan',
          email: 'sudharsananuma23@gmail.com',
        },
      },
      servers: [
        {
          url: `${process.env.SERVER_URL}/api/v1`, 
        },
      ],
    },
    apis: [
      path.join(__dirname, '/../routes/*.js'),
      path.join(__dirname, '/../models/*.js')
  
    ] 
  }
  
  const options = {
      customCss: '.swagger-ui .topbar { display: none }'
  }
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions)
  
  module.exports = swaggerSpec