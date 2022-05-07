const express = require('express');
const router = express.Router();
const UserAccessor = require('./model/User.Model');
const auth_middleware = require('./auth_middleware.js')

// find users with username
router.get('/findUserByUsername/:username', function (req, res) {
    return UserAccessor.findUserByUsername(req.params.username)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// create a new user
router.post('/', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send("Either username or password is missing");
    }
    UserAccessor.findUserByUsername(req.body["username"])
        .then(userResponse => {
            if (userResponse) {
                res.status(402).send("Username is not available")
            } else {
                return UserAccessor.insertUser(req.body)
                    .then(userResponse => res.status(200).send(userResponse))
                    .catch(error => res.status(400).send(error))
            }
        })
})

// find all cars created by the user
router.get('/findAllCarsCreated/:username', function (req, res) {
    return UserAccessor.findAllCarsCreated(req.params.username)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// add a car to the created cars of a user
router.post('/addCarCreated/:username/:carId', function (req, res) {
    return UserAccessor.insertCreatedCarOfUser(req.params.username, req.params.carId)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// find all car reviews created by the user
router.get('/findAllCarReviewsCreated/:username', function (req, res) {
    return UserAccessor.findAllCarReviewsCreated(req.params.username)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// add a car review to the created car reviews of a user
router.post('/addCarReviewCreated/:username/:reviewId', function (req, res) {
    return UserAccessor.insertCreatedCarReviewOfUser(req.params.username, req.params.reviewId)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// check username and password
router.post('/authenticate', function (req, res) {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send('Either username or password is missing');
    }

    return UserAccessor.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return res.status(404).send("Username not found");
            }
            if (userResponse.password === password) {
                req.session.username = username;
                return res.status(200).send({ username });
            } else {
                return res.status(404).send("Password is not correct");
            }
        })
        .catch((error) => console.error(error));
})

// record the user logged in
router.get('/userLoggedIn', auth_middleware, function (req, res) {
    const username = req.session.username;
    return res.send(username);
})

// logout
router.delete('/logout', function (req, res) {
    req.session.destroy();
    return res.status(200).send(req.session);
})

module.exports = router;