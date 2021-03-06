const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const apiRouter = require('./routes/api');

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  mongoose.connect(config.dbString, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to DB!');
    })
    .catch(err => console.log(err));
});
