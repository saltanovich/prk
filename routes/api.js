const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is appliacation API');
});

router.get('/users', (req, res) => {
  User.find({}, (err, data) => {
    res.send(data);
  });
});

router.get('/places', (req, res) => {
  res.send('Send places');
});

module.exports = router;
