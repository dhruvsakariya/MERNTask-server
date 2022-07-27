const express = require("express");

const userProfileController = require("../controllers/userProfile");

const router = express.Router();

// GET /user/profile

router.post("/profile", userProfileController.getUserProfile);

// Post /user/updateProfile

router.get("/updateProfile", userProfileController.updatePost);

module.exports = router;
