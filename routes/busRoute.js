const express = require('express')
const router = express.Router()

const { validateBus, validateBusID, validateSearchBusInputs } = require('../validators/busValidator')
const { addNewBus, removeBus, searchBuses } = require('../controllers/busController')

/**
 * @swagger
 * /bus/addBus:
 *   post:
 *     tags:
 *       - Bus Management
 *     summary: Add a new bus to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busID
 *               - busName
 *               - busNumber
 *               - source
 *               - destination
 *               - travelDate
 *               - departureTime
 *               - farePerSeat
 *               - totalSeats
 *               - availableSeats
 *             properties:
 *               busID:
 *                 type: string
 *                 example: BUS12345
 *                 description: Unique identifier for the bus
 *               busName:
 *                 type: string
 *                 example: City Express
 *                 description: Name of the bus
 *               busNumber:
 *                 type: string
 *                 example: TN01-1234
 *                 description: Registration number of the bus
 *               source:
 *                 type: string
 *                 example: Chennai
 *                 description: Starting point of the bus
 *               destination:
 *                 type: string
 *                 example: Bangalore
 *                 description: Destination of the bus
 *               travelDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-02-01
 *                 description: Date of travel in YYYY-MM-DD format
 *               departureTime:
 *                 type: string
 *                 example: 08:30
 *                 description: Departure time in HH:mm format (24-hour clock)
 *               farePerSeat:
 *                 type: number
 *                 example: 500
 *                 description: Fare per seat in the bus
 *               totalSeats:
 *                 type: number
 *                 example: 40
 *                 description: Total number of seats available in the bus
 *               availableSeats:
 *                 type: number
 *                 example: 30
 *                 description: Number of available seats
 *     responses:
 *       201:
 *         description: Bus added successfully
 *       400:
 *         description: Bad Request (Validation error)
 *       409:
 *         description: Conflict (Duplicate busID or busNumber)
 *       500:
 *         description: Internal server error
 */

router.post('/addBus',validateBus(), addNewBus)

/**
 * @swagger
 * /bus/deleteBus:
 *   delete:
 *     tags:
 *       - Bus Management
 *     summary: Delete an existing bus by its ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busID
 *             properties:
 *               busID:
 *                 type: string
 *                 example: BUS12345
 *                 description: Unique identifier of the bus to be deleted
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       400:
 *         description: Bad Request (Validation error or missing busID)
 *       404:
 *         description: Not Found (Bus with the specified ID does not exist)
 *       500:
 *         description: Internal server error
 */

router.delete('/deleteBus', validateBusID(), removeBus)

/**
 * @swagger
 * /bus/searchBus:
 *   post:
 *     tags:
 *       - Bus Management
 *     summary: Search for buses based on provided criteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - source
 *               - destination
 *             properties:
 *               source:
 *                 type: string
 *                 description: The source location of the bus route
 *                 example: Chennai
 *               destination:
 *                 type: string
 *                 description: The destination location of the bus route
 *                 example: Bangalore
 *               travelDate:
 *                 type: string
 *                 format: date
 *                 description: The travel date for the bus route (optional)
 *                 example: 2025-01-20
 *     responses:
 *       200:
 *         description: Successfully retrieved the buses based on search criteria
 *       400:
 *         description: Bad Request (Validation error or missing fields)
 *       404:
 *         description: Not Found (No buses found matching the criteria)
 *       500:
 *         description: Internal server error
 */

router.post('/searchBus', validateSearchBusInputs(), searchBuses)

module.exports = router