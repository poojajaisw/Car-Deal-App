const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = require('../models/CarModel');

// Create a car
router.post("/cars", async (req, res) => {
  const { type, name, model, image_url, car_info } = req.body;

  try {
    const newCar = new Car({
      type,
      name,
      model,
      image_url, // Include image_url in the creation process
      car_info,
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a car" });
  }
});

// Get all cars
router.get("/cars", async (req, res) => {
  try {
    const allCars = await Car.find();
    res.json(allCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// Get car by ID
router.get("/cars/:carId", async (req, res) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the car" });
  }
});

// Update car by ID
router.patch("/cars/:carId", async (req, res) => {
  const { carId } = req.params;
  const { type, name, model, image_url, car_info } = req.body;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { type, name, model, image_url, car_info }, // Include image_url in the update process
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the car" });
  }
});

// Delete car by ID
router.delete("/cars/:carId", async (req, res) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const deletedCar = await Car.findByIdAndRemove(carId);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the car" });
  }
});

module.exports = router;

