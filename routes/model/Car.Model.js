const mongoose = require("mongoose")
const CarSchema = require('../schema/Car.Schema').CarSchema

const CarModel = mongoose.model("Car", CarSchema);

function insertCar(car) {
    return CarModel.create(car);
}

function getAllCars() {
    return CarModel.find().exec();
}

function findCarByBrand(brand) {
    return CarModel.find({ brand: { $regex: brand, $options: 'i' } }).exec();
}

function findCarById(carId) {
    return CarModel.findById(carId).exec();
}

function deleteCarById(id) {
    return CarModel.deleteOne({ carId: id });
}

function updateCarById(id, car) {
    return CarModel.findByIdAndUpdate(id, car);
}

// This api is just for Favorites, again, we have no idea why this is needed but this is required to make Favorites.jsx work...
function getAllCarsByIds(idArray) {
    return CarModel.find({ '_id': { $in: idArray } }).exec();
}

module.exports = {
    getAllCars,
    insertCar,
    findCarByBrand,
    findCarById,
    deleteCarById,
    updateCarById,
    getAllCarsByIds
};