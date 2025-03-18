const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Field = require('../models/field');

// Handle saving the field data
router.post('/save', async (req, res) => {
  const { userId, name, points, area, perimeter } = req.body;

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newField = new Field({
      userId: userObjectId,
      name,
      points,
      area,
      perimeter,
      partitions: [] // Initialize an empty partition array
    });

    const savedField = await newField.save();
    res.status(201).json(savedField);
  } catch (error) {
    console.error("Error while saving field data: ", error);
    res.status(400).json({ error: 'Failed to save field' });
  }
});

// Route to get field by ID (including partitions)
router.get('/getFieldById/:fieldId', async (req, res) => {
  try {
    const { fieldId } = req.params;

    // Fetch the field with partitions
    const field = await Field.findById(fieldId);
    
    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    res.status(200).json(field); // Return the field data
  } catch (error) {
    console.error('Error while retrieving field by ID: ', error);
    res.status(400).json({ error: 'Failed to retrieve field' });
  }
});

// Route to add partitions to a field
router.post('/addPartition', async (req, res) => {
  const { fieldId, partitionData } = req.body;

  try {
    const field = await Field.findById(fieldId);

    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    if (!Array.isArray(partitionData) || partitionData.length === 0) {
      return res.status(400).json({ error: 'No partition data provided' });
    }

    // Add all partitions from the frontend
    partitionData.forEach(partition => {
      field.partitions.push({
        label: partition.label,
        color: partition.color,
        points: partition.points
      });
    });

    await field.save();

    res.status(200).json({ message: 'Partitions added successfully', field });
  } catch (error) {
    console.error('Error while adding partition: ', error);
    res.status(400).json({ error: 'Failed to add partitions' });
  }
});


// Route to get fields by user
router.get('/getFieldsByUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const fields = await Field.find({ userId: userObjectId });
    res.status(200).json(fields);
  } catch (error) {
    console.error("Error while retrieving fields: ", error);
    res.status(400).json({ error: 'Failed to retrieve fields' });
  }
});

module.exports = router;
