const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');

const { PORT, MONGO_URL } = require('./configs/config');
const runCronJobs = require('./cron');
const { authRouter, carRouter, userRouter } = require('./routes');
const { mainErrorHandler } = require('./errors');

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  next(new Error('Route not fount'));
});

app.use(mainErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
  mongoose.connect(MONGO_URL);

  runCronJobs();
});
