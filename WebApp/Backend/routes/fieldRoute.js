const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Field = require('../models/field');

// Handle saving the field data
router.post('/save', async (req, res) => {
  const { userId, points, area, perimeter } = req.body;

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId); 

    const newField = new Field({
      userId: userObjectId, 
      points,
      area,
      perimeter,
    });

    const savedField = await newField.save();
    res.status(201).json(savedField);
  } catch (error) {
    console.error("Error while saving field data: ", error); 
    res.status(400).json({ error: 'Failed to save field' });
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
