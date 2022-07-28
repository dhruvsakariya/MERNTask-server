const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/isAuth");

const userProfileController = require("../controllers/userProfile");

const User = require("../models/user");

const router = express.Router();

// Get /user/profile
router.get("/profile", isAuth, userProfileController.getUserProfile);

// Post /user/updateProfile
router.post("/updateProfile", isAuth, userProfileController.updateUserProfile);

// Post /user/gallary
router.post("/gallary", isAuth, userProfileController.uploadImages);

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
  body("password").trim().isLength({ min: 6 }),
  isAuth,
  userProfileController.signUp
);

router.post("/login", isAuth, userProfileController.logIn);

module.exports = router;
