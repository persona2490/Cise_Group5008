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
        const isChecked = req.body.isPublished || false;

        const result = await db.collection('user').insertOne({
            Title,
            Authors,
            Journal,
            Year,
            Volume,
            Pages,
            DOI,
            isPublished,
            isAccepted,
            isChecked
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
  Pages: String,
  DOI: String,
  isPublished: Boolean,
  isAccepted:Boolean,
  isChecked:Boolean,
  Claim: String,
  Evidence: String,
  Research: String,
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
  
  console.log('Received request to update article with id:', id);
  console.log('Received request body:', req.body);

  try {
      const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedArticle) {
          console.error('Article not found for id:', id);
          return res.status(404).send('Article not found');
      }

      console.log('Updated article:', updatedArticle);
      
      res.status(200).send(updatedArticle);
  } catch (error) {
      console.error('Server error:', error);
      res.status(500).send('Server error');
  }
});

  router.get('/query_unpublished', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const result = await db.collection('user').find({
          $and: [
            { isPublished: false }, 
            { isAccepted: false },
            { isChecked: false }
          ]
        }).toArray();

        if (result.length == 0) {
            //console.log("没有找到数据");
            res.json({ message: "No unpublished and unaccepted articles found" });
        } else {
            res.json(result);
        }
  
    } catch (err) {
        console.error('Error while querying "user" collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/update_article/:id', async (req, res) => {
    const articleId = req.params.id;
    const updatedData = req.body;

    try {
        await Article.findByIdAndUpdate(articleId, updatedData);
        res.status(200).send({ message: 'Article updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update article', error });
    }
});

router.get('/articles', async (req, res) => {
    try {

      //console.log("检索所有文章");
      const articles = await Article.find({});
      res.json(articles);
    } catch (error) {
      console.error('Error retrieving articles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.patch('/toggle-article-status/:id', async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await Article.findById(articleId);
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      const propertyName = req.query.property;
  
      if (propertyName === 'isPublished') {
        article.isPublished = !article.isPublished;
      } else if (propertyName === 'isAccepted') {
        article.isAccepted = !article.isAccepted;
      } else if (propertyName === 'isChecked') {
        article.isChecked = !article.isChecked;
      } else {
        return res.status(400).json({ message: 'Invalid property name' });
      }
  
      await article.save();
  
      res.json({ message: 'Article status updated successfully' });
    } catch (error) {
      console.error('Error toggling article status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  router.delete('/deleteResource/:id', async (req, res) => {
    try {
      const resourceId = req.params.id;
      console.log('Received request to delete resource with ID:', resourceId);
      const result = await Article.findByIdAndDelete(resourceId);

      res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
      console.error('Error deleting resource:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
