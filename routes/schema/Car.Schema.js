const Schema = require('mongoose').Schema;

exports.CarSchema = new Schema({
    brand: String,
    model: String,
    year: Number,
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'cars' });