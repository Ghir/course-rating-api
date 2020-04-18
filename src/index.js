'use strict';

const express = require('express'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  jsonParser = require('body-parser').json,
  seeder = require('mongoose-seeder'),
  data = require('./data/data.json'),
  courses = require('./routes/courses'),
  users = require('./routes/users'),
  app = express(),
  db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/courseRating');

db.on('error', err => {
  console.error('connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
  seeder.seed(data, {}, () => {
    console.log('Data seeded');
  }).catch(err => {
    console.log(err);
  });
});

app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(jsonParser());

app.use('/', express.static('public'));

app.use('/api/users', users);
app.use('/api/courses', courses);

app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

const server = app.listen(app.get('port'), () => {
  console.log('Express server is listening on port ' + server.address().port);
});
