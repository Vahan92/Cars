const _ = require('lodash');
const { Car, validateCar } = require('../models/cars');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateCar(req.body);
  if (error) {
    return res.status(418).send(error.details[0].message);
  }
  car = new Car(_.pick(req.body, ['brand', 'model', 'year', 'color', 'type']));
  try {
    const newCar = await car.save()
    res.status(201).json(newCar)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

module.exports = router;