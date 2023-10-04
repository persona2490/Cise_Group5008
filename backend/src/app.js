const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Duhang:xjd7604@cise.jgh9sxb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Mongoose model
const User = mongoose.model('User', { Name: String, id: String });

app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Middleware to parse JSON requests

app.post('/api/findUser', async (req, res) => {
  console.log("Received a request at /api/findUser")
  try {
    const user = await User.findOne({ Name: req.body.Name });
    if (user) {
      res.json({ id: user.id });
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});