const { response } = require('express');
const express = require('express');
const router = express.Router();
const CarAccessor = require('./model/Car.Model');

// find all cars in database
router.get('/findAll', function (req, res) {
    return CarAccessor.getAllCars()
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})


// search a car with brand
router.get('/findCarByBrand/:brand', function (req, res) {
    return CarAccessor.findCarByBrand(req.params.brand)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})

// search a car with carId
router.get('/findCarById/:carId', function (req, res) {
    return CarAccessor.getCarById(req.params.carId)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})

// create a new car
router.post('/', function (req, res) {
    const { brand, model, year, description} = req.body;
    if (!brand || !model || !year || !description) {
        return res.status(422).send("Required information is missing");
    }
    return CarAccessor.insertCar(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})

// update a car
router.put('/update/:carId', function (req, res) {
    return CarAccessor.updateCarById(req.params.carId, req.body)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})

// delete a car
router.delete('/delete/:carId', function (req, res) {
    return CarAccessor.deleteCarByCarId(req.params.carId)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})

router.post('/findAllCarsByIds', function (req, res) {
    return CarAccessor.getAllCarsByIds(req.body._id)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error))
})


module.exports = router; 