const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const path = require("path");
const fs = require("fs");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getUserProfile = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const email = req.email;

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

  const {
    email,
    firstName,
    lastName,
    password,
    mobile,
    profileUrl,
    gender,
    education,
    address,
    socialMedia,
    Skills,
    Hobbies,
  } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPw,
        mobile,
        profileUrl,
        gender,
        education,
        address,
        socialMedia,
        Skills,
        Hobbies,
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User Created ! ",
        user: result,
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logIn = (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(" A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      if (rememberMe) {
        const token = jwt.sign(
          { email: loadedUser.email, userId: loadedUser._id.toString() },
          "secretKey",
          { expiresIn: "2h" }
        );
        res.status(200).json({ token, userId: loadedUser._id.toString() });
      } else {
        res.status(200).json({ userId: loadedUser._id.toString() });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// utility
const deleteImage = (imagePath) => {
  imagePath = path.join(__dirname, "..", imagePath);
  fs.unlink(imagePath, (err) => console.log(err));
};
