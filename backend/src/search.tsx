const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// 定义一个路由来执行查询操作
router.get('/query', async (req, res) => {
  try {
    // 获取数据库连接
    const db = mongoose.connection.db;

    // 查询 user 集合中 Pages 字段为 200 的文档
    const query = { Pages: 200 };
    const result = await db.collection('user').find(query).toArray();

    console.log('Documents in "user" collection with Pages=200:');
    console.log(result);

    res.json(result); // 将查询结果作为响应返回
  } catch (err) {
    console.error('Error while querying "user" collection:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
