const express = require('express');
const review = require('./routes/review.js');
const user = require('./routes/user.js');
const path = require('path');

const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
const mongoDbEndPoint = 'mongodb+srv://banana1234:banana1234@webdev.x2vwq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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

app.use('/api/review', job);
app.use('/api/user', user);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(8080, () => {
    console.log('Starting server');
});