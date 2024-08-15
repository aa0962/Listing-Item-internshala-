const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the Item schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String
});
const Item = mongoose.model('Item', itemSchema);

// Route to create an item
app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item' });
  }
});

// Route to fetch items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

// Remove the delete route
// app.delete('/api/items/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await Item.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     res.status(200).json({ message: 'Item deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting item' });
//   }
// });

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
