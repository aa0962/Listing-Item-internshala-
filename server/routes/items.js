const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Import your model

// Route to fetch items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch items from the database
    res.json(items); // Send the items as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Route to create an item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body); // Create a new item with the request body data
    await newItem.save(); // Save the new item to the database
    res.status(201).json(newItem); // Send the newly created item as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Route to delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id); // Delete item by ID
    if (!item) {
      return res.status(404).json({ message: 'Item not found' }); // Handle case where item is not found
    }
    res.status(200).json({ message: 'Item deleted successfully' }); // Confirm deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router;
    