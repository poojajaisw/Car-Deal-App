const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');

const mongoose = require("mongoose");
const User = require('./models/UserModel');
const Dealership = require('./models/DealerModel');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "User not logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, async (error, payload) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      }
      // Handle other errors if needed
      return res.status(401).json({ error: "User not logged in" });
    }

    const { _id, userType } = payload;

    try {
      let dbUser;

      if (userType === 'user') {
        dbUser = await User.findById(_id);
      } else if (userType === 'dealership') {
        dbUser = await Dealership.findById(_id);
      } else {
        return res.status(401).json({ error: "Invalid user type" });
      }

      if (!dbUser) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = dbUser;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
