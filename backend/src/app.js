const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require('./Routes.tsx');

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Duhang:xjd7604@cise.jgh9sxb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    app.use('/api', Routes);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
