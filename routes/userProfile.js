const express = require("express");
const { body } = require("express-validator");

const userProfileController = require("../controllers/userProfile");

const User = require("../models/user");

const router = express.Router();

// Get /user/profile
router.get("/profile", userProfileController.getUserProfile);

// Post /user/createProfile
router.post("/createProfile", userProfileController.createUserProfile);

// Post /user/updateProfile
router.post("/updateProfile", userProfileController.updateUserProfile);

// Post /user/gallary
router.post("/gallary", userProfileController.uploadImages);

router.put(
  "/signup",
  body("email")
    .isEmail()
    .withMessage("please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("E-mail address already exists!!");
        }
      });
    })
    .normalizeEmail(),
  body("password").trim().length({ min: 6 }),
  userProfileController.signUp
);

module.exports = router;
