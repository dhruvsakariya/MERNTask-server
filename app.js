const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const userRoutes = require("./routes/userProfile");
const multer = require("multer");

const app = express();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

// Multer file storage
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.use(upload.array("galleryImages", 100));

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use("/images", express.static("images"));

// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(
    "mongodb+srv://dhruvsakariya:dhruvsakariya@cluster0.zjsru.mongodb.net/mernStackDatabase?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => console.log("Mongo db",err));
