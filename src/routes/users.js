'use strict';

const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  mid = require('../middleware');

router.get('/', mid.authUser, (req, res, ) => {
  res.json(req.user);
  res.status(200);
})

router.post('/', (req, res, next) => {
  const data = {
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    password: req.body.password
  }

  User.findOne({ emailAddress: req.body.emailAddress })
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        const err = new Error();
        err.message = 'Email address already exists.';
        err.status = 401;
        return next(err);
      }

      User.create(data, err => {
        if (err) {
          return res.json(err);
        }
        res.location('/');
        res.status(201).json();
      })
    })
})

module.exports = router;
