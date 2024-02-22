const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SoldVehicle = require('../models/SoldVehicleModel');

// Create a sold vehicle
router.post("/soldvehicles", async (req, res) => {
  const { car_id, vehicle_info } = req.body;

  if (!car_id) {
    return res.status(400).json({ error: "Car ID is required" });
  }

  try {
    const newSoldVehicle = new SoldVehicle({
      car_id,
      vehicle_info,
    });

    const savedSoldVehicle = await newSoldVehicle.save();
    res.status(201).json(savedSoldVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a sold vehicle" });
  }
});

// Get all sold vehicles
router.get("/soldvehicles", async (req, res) => {
  try {
    const allSoldVehicles = await SoldVehicle.find();
    res.json(allSoldVehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sold vehicles" });
  }
});

// Get sold vehicle by ID
router.get("/soldvehicles/:vehicleId", async (req, res) => {
  const { vehicleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ error: "Invalid vehicle ID" });
  }

  try {
    const soldVehicle = await SoldVehicle.findById(vehicleId);
    
    if (!soldVehicle) {
      return res.status(404).json({ error: "Sold vehicle not found" });
    }

    res.json(soldVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the sold vehicle" });
  }
});

// Update sold vehicle by ID
router.patch("/soldvehicles/:vehicleId", async (req, res) => {
  const { vehicleId } = req.params;
  const { vehicle_info } = req.body;

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ error: "Invalid vehicle ID" });
  }

  try {
    const updatedSoldVehicle = await SoldVehicle.findByIdAndUpdate(
      vehicleId,
      { vehicle_info },
      { new: true }
    );

    if (!updatedSoldVehicle) {
      return res.status(404).json({ error: "Sold vehicle not found" });
    }

    res.json(updatedSoldVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the sold vehicle" });
  }
});

// Delete sold vehicle by ID
router.delete("/soldvehicles/:vehicleId", async (req, res) => {
  const { vehicleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ error: "Invalid vehicle ID" });
  }

  try {
    const deletedSoldVehicle = await SoldVehicle.findByIdAndRemove(vehicleId);

    if (!deletedSoldVehicle) {
      return res.status(404).json({ error: "Sold vehicle not found" });
    }

    res.json({ message: "Sold vehicle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the sold vehicle" });
  }
});

module.exports = router;
