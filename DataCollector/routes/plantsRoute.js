const express = require('express');
const router = express.Router();
const Plants = require('../models/plants');

// Route to add a new plant
router.post('/add', async (req, res) => {
  try {
    const newPlant = new Plants(req.body);
    await newPlant.save();
    res.status(201).json({ message: 'Plant added successfully', plant: newPlant });
  } catch (err) {
    res.status(400).json({ message: 'Error adding plant', error: err.message });
  }
});

// Route to delete a plant by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const plant = await Plants.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting plant', error: err.message });
  }
});

// Route to get all plants
router.get('/all', async (req, res) => {
  try {
    const plants = await Plants.find();
    res.status(200).json({ plants });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching plants', error: err.message });
  }
});

// Route to update a plant by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedPlant = await Plants.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json({ message: 'Plant updated successfully', plant: updatedPlant });
  } catch (err) {
    res.status(400).json({ message: 'Error updating plant', error: err.message });
  }
});

module.exports = router;
