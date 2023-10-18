const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.get('/query', async (req, res) => {
    try {
        const query = req.query.search;
        const db = mongoose.connection.db;
        const result = await db.collection('user').find({
            $or: [
                { "Authors": { $regex: query, $options: 'i' } },
                { "Journal": { $regex: query, $options: 'i' } },
                { "Title": { $regex: query, $options: 'i' } },
            ]
        }).toArray();
        if (result.length == 0) {
            res.json({ message: "No article found, please change a keyword" });
        }
        else {
            res.json(result);
        }
    }
    catch (err) {
        console.error('Error while querying "user" collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/submit', async (req, res) => {
    const db = mongoose.connection;
    try {
        const { Title, Authors, Journal, Year, Volume, Pages, DOI } = req.body;
        const result = await db.collection('user').insertOne({
            Title,
            Authors,
            Journal,
            Year,
            Volume,
            Pages,
            DOI
        });
        res.status(201).json({ status: 'success', message: 'Submission successful!' });
    }
    catch (err) {
        console.error('Failed to save to MongoDB', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
//# sourceMappingURL=Routes.js.map