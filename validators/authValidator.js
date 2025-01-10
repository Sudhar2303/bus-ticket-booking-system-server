const { validateEmail, validateName, validatePassword } = require('../validators/commonValidators')

const validateUserSignupInputValues = () => [
    validateName(),
    validateEmail(),
    validatePassword()
];

const validateUserLoginInput = () => [
    validateEmail(),
    validatePassword()
]

module.exports =  {
    validateUserSignupInputValues,
    validateUserLoginInput
}