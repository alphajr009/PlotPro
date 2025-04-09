const express = require('express');
const router = express.Router();
const InputModel = require('../models/InputModel');

// Get items by type
router.get('/getItems/:type', async (req, res) => {
    try {
      const items = await InputModel.find({ Type: req.params.type });
      res.json(items);
    } catch (error) {
      res.status(500).send('Error while getting items.');
    }
  });
  
  // Add a new item
  router.post('/addItem', async (req, res) => {
    try {
      const { Type, Name } = req.body;
      const newItem = new InputModel({ Type, Name });
      const savedItem = await newItem.save();
      res.json(savedItem);
    } catch (error) {
      res.status(500).send('Error while adding item.');
    }
  });
  
  // Delete an item
  router.delete('/deleteItem/:id', async (req, res) => {
    try {
      await InputModel.findByIdAndDelete(req.params.id);
      res.send('Item deleted successfully.');
    } catch (error) {
      res.status(500).send('Error while deleting item.');
    }
  });
  
  module.exports = router;