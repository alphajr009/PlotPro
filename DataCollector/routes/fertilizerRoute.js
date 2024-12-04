const express = require("express");
const router = express.Router();
const Fertilizer = require("../models/fertilizer");

// Save a new fertilizer
router.post("/add", async (req, res) => {
  console.log(req.body);  
  try {
    const fertilizers = req.body;
    const savedFertilizers = await Fertilizer.insertMany(fertilizers);
    res.status(201).json({ message: "Fertilizers added successfully", fertilizers: savedFertilizers });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add fertilizers", error: err.message });
  }
});


// Update fertilizer by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFertilizer = await Fertilizer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }
    res.status(200).json({ message: "Fertilizer updated successfully", updatedFertilizer });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update fertilizer", error: err.message });
  }
});

// Delete fertilizer by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFertilizer = await Fertilizer.findByIdAndDelete(id);
    if (!deletedFertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }
    res.status(200).json({ message: "Fertilizer deleted successfully", deletedFertilizer });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to delete fertilizer", error: err.message });
  }
});


// Get all fertilizers
router.get('/getall', async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find();  
    res.status(200).json(fertilizers); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fertilizers', error: error.message });
  }
});



module.exports = router;
