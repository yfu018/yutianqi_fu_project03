const express = require('express');
const car = require('./routes/car.js');
const review = require('./routes/review.js');
const user = require('./routes/user.js');
const path = require('path');

const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
const mongoDbEndPoint = 'mongodb+srv://banana1234:banana1234@webdev.x2vwq.mongodb.net/myFirstDatabase'
const mongoose = require('mongoose');
mongoose.connect(mongoDbEndPoint, { useNewUrlParser: true })

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();
app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoDbEndPoint }),
}));

const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/car', car);
app.use('/api/review', review);
app.use('/api/user', user);

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(3050, () => {
    console.log('Starting server');
});