const mongoose = require("mongoose");

const ReviewSchema = require("../schema/Review.Schema");

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
  return ReviewModel.create(review);
}

function getReviewByUsername(username) {
  return ReviewModel.find({
    username: username,
  }).exec();
}

function getAllReviews() {
  return ReviewModel.find().exec();
}

function getReviewsByCarId(carId) {
  return ReviewModel.find({
    carId: carId,
  })
    .sort([["date", -1]])
    .exec();
}

function getReviewById(id) {
  return ReviewModel.findById(id).exec();
}

function updateReview(id, content, rating) {
  const filter = { _id: id };
  const update = { content: content, rating: rating, date: Date.now() };
  return ReviewModel.findOneAndUpdate(filter, update, { new: true }).exec();
}

function deleteReview(id) {
  return ReviewModel.deleteOne({ _id: id }).exec();
}

module.exports = {
  createReview,
  getReviewByUsername,
  getReviewsByCarId,
  getAllReviews,
  updateReview,
  getReviewById,
  deleteReview,
};
