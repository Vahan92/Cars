const _ = require('lodash');
const { Car } = require('../models/cars');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const usersProjection = {
    __v: false
  };
  Car.find({}, usersProjection, function (err, cars) {
    if (err)
      res.status(400).send('Cannot get cars')
    if (cars) {
      res.send(cars);
    }
  });
});

module.exports = router;