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

app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Middleware to parse JSON requests

// 导入查询数据库的路由
const dbRoutes = require('./search.tsx');
app.use('/api', dbRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
