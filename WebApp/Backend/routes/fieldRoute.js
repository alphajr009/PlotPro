const express = require('express');
const router = express.Router();
const Field = require('../models/field');

router.post('/save', async (req, res) => {
  const { userId, points, area, perimeter } = req.body;

  try {
    const newField = new Field({
      userId,
      points,
      area,
      perimeter
    });

    const savedField = await newField.save();
    res.status(201).json(savedField);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save field' });
  }
});

router.get('/getFieldsByUser/:userId', async (req, res) => {
  try {
    const fields = await Field.find({ userId: req.params.userId });
    res.status(200).json(fields);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve fields' });
  }
});

module.exports = router;
