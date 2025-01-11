const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         bookingID:
 *           type: string
 *           description: The unique identifier for the booking
 *           example: BOOK12345
 *         busID:
 *           type: string
 *           description: The ID of the bus being booked
 *           example: BUS123
 *         userID:
 *           type: string
 *           description: The ID of the user making the booking
 *           example: USER123
 *         seats:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of booked seats
 *           example: ["R1U1", "R2L1"]
 *         totalFare:
 *           type: number
 *           description: The total fare for the booked seats
 *           example: 1500
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the booking was made
 *           example: 2025-01-10T14:30:00.000Z
 *         status:
 *           type: string
 *           description: The status of the booking
 *           example: "confirmed"
 *       required:
 *         - bookingID
 *         - busID
 *         - userID
 *         - seats
 *         - totalFare
 *         - bookingDate
 *         - status
 */

const bookingSchema = new mongoose.Schema(
  {
    busID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Bus ID is required'],
      ref: 'buses'
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref : 'users'
    },
    seats: {
      type: [String], 
      required: [true, 'Seats are required'],
    },
    totalFare: {
      type: Number,
      required: [true, 'Total fare is required'],
      min: [0, 'Total fare cannot be negative'],
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true, 
    collection: 'bookings',
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
