const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Grid = require('gridfs-stream');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Middleware to parse JSON requests

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
console.log("Received a request at /api/findUser")

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

// GridFS Configuration
let gfs;
const dbName = "cise";  // Replace with your actual database name
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Multer GridFS storage configuration
const storage = new GridFsStorage({
  url: `mongodb+srv://Duhang:xjd7604@cise.jgh9sxb.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
      return {
          filename: `uploads/${file.originalname}`,  // Specifying the path under 'uploads'
          bucketName: 'uploads'  // Matching the collection name
      };
  }
});
const upload = multer({ storage });

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send({ fileId: req.file.id });
});

// ... your existing code ...

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});