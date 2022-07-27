const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.getUserProfile = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation failed, entered data is incorrect",
      errors: errors.array(),
    });
  }

  const email = req.body.email;

  console.log({ email });

  res.status(200).json({
    user: {
      firstName: "Dhruv",
      lastName: "Sakariya",
      email: "dhruvsakariya2304@gmail.com",
      mobile: "(098) 765-4321",
      profileUrl:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      gender: "Male",
      education: "Full Stack Developer",
      address: "Bay Area, San Francisco, CA",
      socialMedia: {
        personal: "https://mdbootstrap.com1",
        github: "https://mdbootstrap.com2",
        twitter: "https://mdbootstrap.com3",
        instagram: "https://mdbootstrap.com4",
        facebook: "https://mdbootstrap.com5",
      },

      Skills: [
        {
          name: "Web Design",
          skillRate: "30%",
        },
        {
          name: "Website Markup",
          skillRate: "40%",
        },
        {
          name: "One Page",
          skillRate: "50%",
        },
        {
          name: "Mobile Template",
          skillRate: "60%",
        },
        {
          name: "Backend API",
          skillRate: "70%",
        },
      ],
      Hobbies: [
        {
          name: "Web Design",
          skillRate: "50%",
        },
        {
          name: "Website Markup",
          skillRate: "40%",
        },
        {
          name: "One Page",
          skillRate: "30%",
        },
        {
          name: "Mobile Template",
          skillRate: "20%",
        },
        {
          name: "Backend API",
          skillRate: "10%",
        },
      ],
    },
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
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User Created ",
        user: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateUserProfile = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
