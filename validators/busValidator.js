const { body } = require('express-validator');

const validateBusID = () => {
    return body('busID')
        .notEmpty()
            .withMessage('Bus ID is a mandatory field')
        .isString()
            .withMessage('Bus ID must be a string')
        .matches(/^BUS\d+$/)
            .withMessage('Bus ID must start with "BUS" followed by numbers');
};

const validateBusName = () => {
    return body('busName')
        .notEmpty()
            .withMessage('Bus name is a mandatory field')
        .isLength({ min: 1, max: 100 })
            .withMessage('Bus name must be between 1 and 100 characters long')
        .matches( /^[A-Za-z0-9\s]+$/)
            .withMessage('Bus name can only contain letters and spaces')
        .custom((value) => {
                if (value.trim().length === 0) {
                    throw new Error('Bus name cannot be empty or consist of spaces only');
                }
                return true;
            });
};

const validateBusNumber = () => {
    return body('busNumber')
        .notEmpty()
            .withMessage('Bus number is a mandatory field')
        .matches(/^[A-Za-z0-9\- ]+$/)
            .withMessage('Bus number must contain only letters, numbers, spaces, or hyphens');
};

const validateSource = () => {
    return body('source')
        .notEmpty()
            .withMessage('Source is a mandatory field')
        .isString()
            .withMessage('Source must be a string');
};

const validateDestination = () => {
    return body('destination')
        .notEmpty()
            .withMessage('Destination is a mandatory field')
        .isString()
            .withMessage('Destination must be a string');
};

const validateTravelDate = () => {
    return body('travelDate')
        .notEmpty()
            .withMessage('Travel date is a mandatory field')
        .isISO8601()
            .withMessage('Travel date must be in YYYY-MM-DD format');
};

const validateDepartureTime = () => {
    return body('departureTime')
        .notEmpty()
            .withMessage('Departure time is a mandatory field')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
            .withMessage('Departure time must be in HH:mm format (24-hour clock)');
};

const validateFarePerSeat = () => {
    return body('farePerSeat')
        .notEmpty()
            .withMessage('Fare per seat is a mandatory field')
        .isFloat({ min: 0 })
            .withMessage('Fare per seat must be a positive value');
};

const validateTotalSeats = () => {
    return body('totalSeats')
        .optional()
        .isInt({ min: 1 })
            .withMessage('Total seats must be at least 1');
};


const validateBus = () => [
    validateBusID(),
    validateBusName(),
    validateBusNumber(),
    validateSource(),
    validateDestination(),
    validateTravelDate(),
    validateDepartureTime(),
    validateFarePerSeat(),
    validateTotalSeats()
];

const validateSearchBusInputs = () => [
    validateSource(),
    validateDestination(),
    validateTravelDate()
]
module.exports = {
    validateBus,
    validateBusID,
    validateSearchBusInputs
};
