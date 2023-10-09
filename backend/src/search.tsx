const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/query', async (req, res) => {
  try {
      const query = req.query.search;
      const db = mongoose.connection.db;
      const result = await db.collection('user').find({
        $or: [
            {"Authors": {$regex: query, $options: 'i'}},
            {"Journal name": {$regex: query, $options: 'i'}},
            {"Title": {$regex: query, $options: 'i'}},
        ]}).toArray();

      if (result.length == 0) {
          res.json({ message: "No article found, please change a keyword" });
      } else {
          res.json(result);
      }

  } catch (err) {
      console.error('Error while querying "user" collection:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
