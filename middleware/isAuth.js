const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("token not found");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];

  let decodedToken;
  try {
    console.log(token)
    decodedToken = jwt.verify(token, "secretKey");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};