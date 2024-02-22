const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./config');

const mongoose = require("mongoose");
const Dealership = require('../models/DealerModel'); 

// Signup route
router.post("/dealerData", async (req, res) => {
  const { dealership_email, password, dealership_name, dealership_location, dealership_info } = req.body;

  if (!dealership_email || !password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  try {
    const dealershipInDB = await Dealership.findOne({ dealership_email });

    if (dealershipInDB) {
      return res.status(500).json({ error: "Dealership with this email already registered" });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    const dealership = new Dealership({
      dealership_email,
      password: hashedPassword,
      dealership_name,
      dealership_location,
      dealership_info,
    });

    const newDealership = await dealership.save();
    res.status(201).json({ result: "Dealership data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save dealership to the database" });
  }
});

// Login route
router.post("/dealerlogin", async (req, res) => {
  const { dealership_email, password } = req.body;

  if (!dealership_email || !password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  try {
    const dealershipInDB = await Dealership.findOne({ dealership_email });

    if (!dealershipInDB) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const didMatch = await bcryptjs.compare(password, dealershipInDB.password);

    if (didMatch) {
      const token = jwt.sign({ _id: dealershipInDB._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error finding dealership in the database:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
