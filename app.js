const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const mongoose = require('mongoose')

// const angularFileUpload = angular.module('my-app', ['angularFileUpload']);

require('./database');

const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');

const app = express();

//MIDDLEWARES:
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'authlivecode',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
 }));

 app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));

app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);
// app.use('/api/recipes/:id', angularFileUpload);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({code: 'not found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;
