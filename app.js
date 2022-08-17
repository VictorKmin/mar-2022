const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT, MONGO_URL } = require('./configs/config');
const { userRouter } = require('./routes');
const { mainErrorHandler } = require("./errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  next(new Error('Route not fount'));
});

app.use(mainErrorHandler);

app.listen(PORT, () => {
  console.log('App listen', PORT);
  mongoose.connect(MONGO_URL);
});
