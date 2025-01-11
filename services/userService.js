const userModel = require('../models/userModel')

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

const findUserById = async (id) => {
    return await userModel.findOne({ _id: id })
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
}