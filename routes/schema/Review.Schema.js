const Schema = require("mongoose").Schema;

exports.ReviewSchema = new Schema(
  {
    content: String,
    carId: String,
    username: String,
    date: {
      type: Date,
      default: Date.now,
    },
    rating: Number,
  }, { collection: "reviews"});
