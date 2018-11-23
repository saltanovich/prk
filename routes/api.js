const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is appliacation API');
});

router.post('/register', (req, res) => {
  const errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: 'Password do not match' });
  }
  if (req.body.password.length < 6) {
    errors.push({ text: 'Password must contain at least 6 characters' });
  }
  if (errors.length > 0) {
    res.send(errors);
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.send('Email already exists');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.name, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(() => {
                  res.send('You are now registered and can log in');
                })
                .catch(error => console.log(error));
            });
          });
        }
      });
  }
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
