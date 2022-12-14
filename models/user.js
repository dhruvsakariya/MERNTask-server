const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  socialMedia: {
    type: Object,
    required: true,
  },
  Skills: [
    {
      name: { type: String, required: true },
      skillRate: { type: String, required: true },
    },
  ],
  Hobbies: [
    {
      name: { type: String, required: true },
      skillRate: { type: String, required: true },
    },
  ],
  Gallary: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
