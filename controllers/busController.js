
const { validationResult } = require('express-validator')
const { findBusByBusID, createBus, deleteBus, getBusesByCriteria } = require('../services/busService')
const { setResponseBody } = require('../utils/responseFormatter')
const { response } = require('express')

const addNewBus = async(request,response) => {
    let { busID, busName, busNumber, source, destination, travelDate, departureTime, farePerSeat, totalSeats, availableSeats } = request.body
    try
    {
        const errors = validationResult(request)

        if(!errors.isEmpty()) {
            return response.status(400).send(setResponseBody(errors.array()[0].msg,"validation_error",null))
        }

        const existingBus = await findBusByBusID(busID)
        if(existingBus)
            return response.status(409).send(setResponseBody("Bus details already exist","existing_bus_deatils",null)) 

        const newBus = await createBus({ busID, busName, busNumber, source, destination, travelDate, departureTime, farePerSeat, totalSeats, availableSeats })

        let responseData = {
            name : newBus.busName,
            source : newBus.source, 
            destination: newBus.destination
        }

        response.status(201).send(setResponseBody("Bus created Successfully", null, responseData))
    }
    catch(error)
    {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

const removeBus = async (request, response) => {
    const { busID } = request.body;

    try {

        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(400).send(setResponseBody(errors.array()[0].msg, "validation_error", null))
        }

        const existingBus = await findBusByBusID(busID)
        if (!existingBus) {
            return response.status(404).send(setResponseBody("Bus not found", "bus_not_found", null))
        }

        if (existingBus.availableSeats < existingBus.totalSeats) {
            return response.status(400).send(setResponseBody("Cannot remove bus with available seats", "non_removable_bus", null))
        }

        const deleteBusDetails =  await deleteBus(existingBus._id)
        if( deleteBusDetails .acknowledged = true)
            return response.status(200).send(setResponseBody("Bus removed successfully", null, null));
        else
            response.status(500).send(setResponseBody("Failed to remove bus", "delete_failed", null));
    } catch (error) {
        response.status(500).send(setResponseBody(error.message, "server_error", null));
    }
}

const searchBuses = async( request, response) => {
    const { source, destination, travelDate } = request.body;

    try {
        
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(400).send(setResponseBody(errors.array()[0].msg, "validation_error", null))
        }

        const travelDateParsed = new Date(travelDate);
        if (isNaN(travelDateParsed.getTime())) {
            return response.status(400).send(setResponseBody("Invalid travel date format", "validation_error", null));
        }

        const buses = await getBusesByCriteria( source, destination, travelDateParsed)

        if (!Array.isArray(buses) || buses.length === 0) {
            return response.status(404).send(setResponseBody("No buses found for the given criteria", "not_found", null));
        }

        const responseData = buses.map((bus) => ({
            busName: bus.busName,
            busNumber: bus.busNumber,
            source: bus.source,
            destination: bus.destination,
            travelDate: bus.travelDate,
            departureTime: bus.departureTime,
            farePerSeat: bus.farePerSeat,
            availableSeats: bus.availableSeats,
        }));

        response.status(200).send(setResponseBody("Buses retrieved successfully", null, responseData));
    } catch (error) {
        response.status(500).send(setResponseBody(error.message, "server_error", null));
    }
}

module.exports = {
    addNewBus,
    removeBus,
    searchBuses
}