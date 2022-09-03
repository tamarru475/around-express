const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const limiter = require('./rateLimit');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(limiter);
app.disable('x-powered-by');
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '631054df5b795b63c88556a3',
  };
  next();
});

app.use('/', mainRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);
