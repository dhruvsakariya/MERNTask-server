const express = require("express");
const { body } = require("express-validator");

const userProfileController = require("../controllers/userProfile");

const router = express.Router();

// Get /user/profile

router.post(
  "/profile",
  [body("email").trim().isEmail()],
  userProfileController.getUserProfile
);

// Post /user/createProfile
router.post("/createProfile", userProfileController.createUserProfile);

// Post /user/updateProfile

router.post("/updateProfile", userProfileController.updateUserProfile);

module.exports = router;
