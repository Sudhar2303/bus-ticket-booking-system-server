const userModel = require('../Model/userModel')

const findUserByEmail = (email) => {
    return userModel.findOne({ email }).select('+password')
}

const createUser = async (name, email, password ) => {

    const user = new userModel({
        name,
        email,
        password
    });

    await user.save();

    return user;
};

module.exports = {
    findUserByEmail,
    createUser
}