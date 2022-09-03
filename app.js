const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '631054df5b795b63c88556a3',
  };
  next();
});

app.use('/', usersRouter, cardsRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);
