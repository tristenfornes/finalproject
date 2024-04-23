const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Configuration variables
const PORT = 3004;
const MONGO_URI = 'mongodb+srv://tristenfornes47:3haHgYqc093USMjI@cluster0.dab758d.mongodb.net/'; 

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// Data model
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Data = mongoose.model('Data', DataSchema);

// API Routes
app.post('/data', async (req, res) => {
  const newData = new Data(req.body);
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/data/:id', async (req, res) => {
  const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedData) {
    return res.status(404).json({ message: 'Data not found' });
  }
  res.json(updatedData);
});

app.delete('/data/:id', async (req, res) => {
  const result = await Data.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(404).json({ message: 'Data not found' });
  }
  res.json({ message: 'Deleted Successfully' });
});

// Serve static files from the 'finalproject' directory
app.use(express.static(path.join(__dirname, 'finalproject')));

// Root route to serve index.html from within the 'finalproject' folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'finalproject', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
