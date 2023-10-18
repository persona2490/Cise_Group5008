const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/query', async (req, res) => {
    try {
        const query = req.query.search;
        const db = mongoose.connection.db;
        const result = await db.collection('user').find({
          $and: [
            { isPublished: true }, 
            { isAccepted: true },
            { $or: [
                {"Authors": {$regex: query, $options: 'i'}},
                {"Journal": {$regex: query, $options: 'i'}},
                {"Title": {$regex: query, $options: 'i'}},
            ]}
          ]
        }).toArray();

        if (result.length == 0) {
            console.log("没有找到数据");
            res.json({ message: "No article found, please change a keyword" });
        } else {
            res.json(result);
        }
  
    } catch (err) {
        console.error('Error while querying "user" collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/submit', async (req, res) => {
    const db = mongoose.connection;
    try {
        const {
            Title,
            Authors,
            Journal,
            Year,
            Volume,
            Pages,
            DOI
        } = req.body;
        console.log("Received data:", JSON.stringify(req.body));

        const isPublished = req.body.isPublished || false;
        const isAccepted = req.body.isPublished || false;

        const result = await db.collection('user').insertOne({
            Title,
            Authors,
            Journal,
            Year,
            Volume,
            Pages,
            DOI,
            isPublished,
            isAccepted
        });

        console.log("Data to be inserted:", JSON.stringify(result));

        res.status(201).json({ status: 'success', message: 'Submission successful!' });
    } catch (err) {
        console.error('Failed to save to MongoDB', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const articleSchema = new mongoose.Schema({
    Title: String,
    Authors: [String],
    Journal: String,
    Year: Number,
    Volume: String,
    pages: String,
    DOI: String,
    isPublished: Boolean,
    isAccepted:Boolean
  });
  
const Article = mongoose.model('Article', articleSchema, 'user');

router.get('/published', async (req, res) => {
    try {
        const articles = await Article.find({ isAccepted: true });
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedArticle) {
        return res.status(404).send('Article not found');
      }
  
      res.status(200).send(updatedArticle);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

  router.get('/query_unpublished', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const result = await db.collection('user').find({
          $and: [
            { isPublished: false }, 
            { isAccepted: false }
          ]
        }).toArray();

        if (result.length == 0) {
            console.log("没有找到数据");
            res.json({ message: "No unpublished and unaccepted articles found" });
        } else {
            res.json(result);
        }
  
    } catch (err) {
        console.error('Error while querying "user" collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
