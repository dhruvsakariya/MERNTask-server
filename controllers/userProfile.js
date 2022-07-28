const { validationResult } = require("express-validator");

const path = require("path");
const fs = require("fs");
const User = require("../models/user");

exports.getUserProfile = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const email = "dhruvsakariya2304@gmail.com";

  User.findOne({ email })
    .then((userProfile) => {
      if (!userProfile) {
        const error = new Error("Could not find User");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ userProfile });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createUserProfile = (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    mobile,
    profileUrl,
    gender,
    education,
    address,
    socialMedia,
    Skills,
    Hobbies,
  } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    mobile,
    profileUrl,
    gender,
    education,
    address,
    socialMedia,
    Skills,
    Hobbies,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User Created ",
        user: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUserProfile = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};

exports.uploadImages = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  if (!req.files) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  } else {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }
    res.status(201).json({
      images: reqFiles,
      message: "Post created success fully",
    });
  }
};

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("validation failed, entered data is incorrect");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};

// utility
const deleteImage = (imagePath) => {
  imagePath = path.join(__dirname, "..", imagePath);
  fs.unlink(imagePath, (err) => console.log(err));
};
