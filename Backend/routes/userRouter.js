const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./config');

const mongoose = require("mongoose");
const User = require('../models/UserModel');

// user data route
router.post("/userdata", async (req, res) => {
  const { user_email, password, user_location, user_info } = req.body;

  if (!user_email || !password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  try {
    const userInDB = await User.findOne({ user_email });

    if (userInDB) {
      return res.status(500).json({ error: "User with this email already registered" });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    const user = new User({
      user_email,
      password: hashedPassword,
      user_location,
      user_info,
    });

    const newUser = await user.save();
    res.status(201).json({ result: "User data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save user to the database" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { user_email, password } = req.body;

  console.log('Login Request - Email:', user_email);

  if (!user_email || !password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  try {
    const userInDB = await User.findOne({ user_email });

    if (!userInDB) {
      console.log('User not found');
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const didMatch = await bcryptjs.compare(password, userInDB.password);

    console.log('Password Match:', didMatch);

    if (didMatch) {
      const token = jwt.sign({ _id: userInDB._id }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated Token:', token);
      res.json({ token });
    } else {
      console.log('Password mismatch');
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error finding user in the database:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
