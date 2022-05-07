const express = require("express");

const UserAccessor = require("./model/User.model");
const ReviewAccessor = require("./model/Review.model");
const CarAccessor = require("./model/Car.model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./auth_middleware");
const router = express.Router();

//create a new review
router.post("/create", auth_middleware, function (request, response) {
  if (
    !request.body.content ||
    !request.body.rating ||
    !request.body.carId
  ) {
    return response
      .status(400)
      .send("Missing review content, or rating.");
  }

  if (typeof request.body.content !== "string") {
    return response.status(400).send("Content must be a string.");
  }

//   if (typeof request.body.gameTitle !== "string") {
//     return response.status(400).send("gameTitle must be a string.");
//   }

  if (
    typeof request.body.rating !== "number" ||
    request.body.rating < 0 ||
    request.body.rating > 5
  ) {
    return response
      .status(400)
      .send("Error: rating must be a number between 0 and 5.");
  }

  const newReview = {
    username: request.username,
    content: request.body.content,
    rating: request.body.rating,
    carId: request.body.carId,
  };

  return CarAccessor.getCarByCarId(request.body.carId)
    .then((car) => {
      if (!car) {
        throw new Error("NotFound");
      }
      return ReviewAccessor.createReview(newReview);
    })
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      if (error.message == "NotFound") {
        return response.status(400).send("Game not found.");
      }
      return response.status(400).send(error);
    });
});

// edit the content of a review
router.post("/edit", auth_middleware, function (request, response) {
  if (request.body.rating) {
    if (
      typeof request.body.rating !== "number" ||
      request.body.rating < 0 ||
      request.body.rating > 5
    ) {
      return response
        .status(400)
        .send("Error: rating must be a number between 0 and 5.");
    }
  }

  if (request.body.content) {
    if (typeof request.body.content !== "string") {
      return response.status(400).send("content must be a string.");
    }
  }

  return ReviewAccessor.getReviewById(request.body.reviewId)
    .then((review) => {
      if (!review) {
        throw new Error("NotFound");
      } else if (review.username != request.username) {
        throw new Error("Unauthorized");
      }

      const newContent = request.body.content
        ? request.body.content
        : review.content;
      const newRating = request.body.rating
        ? request.body.rating
        : review.rating;

      return ReviewAccessor.updateReview(request.body.id, newContent, newRating);
    })
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      if (error.message == "NotFound") {
        return response.status(400).send("Review not found.");
      } else if (error.message == "Unauthorized") {
        return response
          .status(401)
          .send("Cannot edit review created by another user.");
      }
      return response.status(400).send(error);
    });
});

router.post("/delete", auth_middleware, function (request, response) {
  if (!request.body.id) {
    return response.status(400).send("missing review id.");
  }
  return ReviewAccessor.getReviewById(request.body.id)
    .then((review) => {
      if (!review) {
        throw new Error("NotFound");
      } else if (review.username != request.username) {
        throw new Error("Unauthorized");
      }
      return ReviewAccessor.deleteReview(request.body.id);
    })
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      if (error.message == "NotFound") {
        return response.status(400).send("Review not found.");
      } else if (error.message == "Unauthorized") {
        return response
          .status(401)
          .send("Cannot delete review created by another user.");
      }
      return response.status(400).send(error);
    });
});

module.exports = router;
