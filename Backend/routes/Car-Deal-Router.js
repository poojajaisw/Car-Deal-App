const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deal = require('../models/Deal'); // Adjust the path to the Deal model accordingly

// Create a deal
router.post("/cardeal", async (req, res) => {
  const { car_id, deal_info } = req.body;

  try {
    // Ensure car_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(car_id)) {
      return res.status(400).json({ error: "Invalid car ID" });
    }

    const newDeal = new Deal({
      car_id,
      deal_info,
    });

    const savedDeal = await newDeal.save();
    res.status(201).json(savedDeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a deal" });
  }
});

// Get all deals
router.get("/allcar", async (req, res) => {
  try {
    const allDeals = await Deal.find();
    res.json(allDeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

// Get deal by ID
router.get("/:dealId", async (req, res) => {
  const { dealId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(dealId)) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }

  try {
    const deal = await Deal.findById(dealId);
    
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the deal" });
  }
});

// Update deal by ID
router.patch("/:dealId", async (req, res) => {
  const { dealId } = req.params;
  const { deal_info } = req.body;

  if (!mongoose.Types.ObjectId.isValid(dealId)) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }

  try {
    const updatedDeal = await Deal.findByIdAndUpdate(
      dealId,
      { deal_info },
      { new: true }
    );

    if (!updatedDeal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json(updatedDeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the deal" });
  }
});

// Delete deal by ID
router.delete("/:dealId", async (req, res) => {
  const { dealId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(dealId)) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }

  try {
    const deletedDeal = await Deal.findByIdAndRemove(dealId);

    if (!deletedDeal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json({ message: "Deal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the deal" });
  }
});

module.exports = router;

