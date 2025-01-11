const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Bus:
 *       type: object
 *       properties:
 *         busID:
 *           type: string
 *           description: The unique identifier for the bus
 *           example: BUS123
 *         busName:
 *           type: string
 *           description: The name of the bus
 *           example: City Express
 *         busNumber:
 *           type: string
 *           description: The unique number of the bus
 *           example: TN45-AB-1234
 *         source:
 *           type: string
 *           description: The starting location of the bus
 *           example: Chennai
 *         destination:
 *           type: string
 *           description: The destination location of the bus
 *           example: Bangalore
 *         travelDate:
 *           type: string
 *           format: date
 *           description: The travel date of the bus
 *           example: 2025-01-15
 *         departureTime:
 *           type: string
 *           description: The departure time of the bus in HH:mm format (24-hour clock)
 *           example: 14:30
 *         farePerSeat:
 *           type: number
 *           description: The fare per seat for the bus
 *           example: 500
 *         totalSeats:
 *           type: number
 *           description: The total number of seats available in the bus
 *           example: 40
 *         availableSeats:
 *           type: number
 *           description: The number of seats currently available for booking
 *           example: 25
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the bus entry was created
 *           example: 2025-01-10T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the bus entry was last updated
 *           example: 2025-01-10T12:30:00.000Z
 *       required:
 *         - busID
 *         - busName
 *         - busNumber
 *         - source
 *         - destination
 *         - travelDate
 *         - departureTime
 *         - farePerSeat
 *         - availableSeats
 */

const busSchema = new mongoose.Schema(
  {
    busID: {
        type: String,
        unique: true,
        required: [true, 'Bus ID is a mandatory field'],
    },
    busName : {
        type: String, 
        required: [true, 'Bus name is mandatory field'],
        minlength: [1, 'Bus name must be at least 1 character long'],
        maxlength: [100, 'Bus name must not exceed 100 characters'],
        match: [
            /^[A-Za-z0-9\s]+$/, 
            'Bus name can only contain letters, numbers, and spaces',
        ],
    },
    busNumber: {
        type: String,
        unique: true,
        required: [true, 'Bus number is a mandatory field'],
        match: [
            /^[A-Za-z0-9\- ]+$/,
            'Bus number must contain only letters, numbers, spaces, or hyphens.',
        ],
    },
    source: {
        type: String,
        required: [true, 'Source is a mandatory field'],
        trim: true,
    },
    destination: {
        type: String,
        required: [true, 'Destination is a mandatory field'],
        trim: true,
    },
    travelDate: {
        type: Date,
        required: [true, 'Travel date is a mandatory field'],
    },
    departureTime: {
        type: String, 
        required: [true, 'Departure time is a mandatory field'],
        match: [
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Departure time must be in HH:mm format (24-hour clock).',
        ],
    },
    farePerSeat: {
        type: Number,
        required: [true, 'Fare per seat is a mandatory field'],
        min: [0, 'Fare per seat must be a positive value'],
    },
    totalSeats: {
        type: Number,
        default: 40,
        min: [1, 'Total seats must be at least 1'],
    },
    availableSeats: {
        type: Number,
        required: true,
        min: [0, 'Available seats cannot be negative'],
        validate: {
            validator: function (value) {
            return value <= this.totalSeats;
            },
            message: 'Available seats cannot exceed total seats',
        },
    },
  },
  {
        timestamps: true, 
        collection: 'buses',
  }
);

module.exports = mongoose.model('Bus', busSchema);
