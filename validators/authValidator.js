const { validateEmail, validateName, validatePassword } = require('../validators/commonValidators')

const validateUserSignupInputValues = () => [
    validateName(),
    validateEmail(),
    validatePassword()
];

module.exports =  {
    validateUserSignupInputValues
}