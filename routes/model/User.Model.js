const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).exec();
}

function findAllCarsCreated(username) {
    return UserModel.findOne({ username: username }, 'carsCreated').exec();
}

function insertCreatedCarOfUser(username, carId) {
    return UserModel.findOneAndUpdate({ username: username }, { $addToSet: { carsCreated: carId } });
}

function findAllCarReviewsCreated(username) {
    return UserModel.findOne({ username: username }, 'reviewsCreated').exec();
}

function insertCreatedCarReviewOfUser(username, carId) {
    return UserModel.findOneAndUpdate({ username: username }, { $addToSet: { reviewsCreated: reviewId } });
}

module.exports = {
    insertUser,
    findUserByUsername,
    findAllCarsCreated,
    insertCreatedCarOfUser,
    findAllCarReviewsCreated,
    insertCreatedCarReviewOfUser
};