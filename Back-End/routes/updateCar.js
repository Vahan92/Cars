const { Car } = require('../models/cars');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.patch('/:_id', async (req, res) => {

  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const car = await Car.findByIdAndUpdate(req.params._id, {
    $set: req.body
  });
  if (!car) {
    return res.status(404).send(req.body);
  }
  return res.status(200).send(car);
});

function validate(req) {
  const schema = {
    _id: Joi.string(),
    brand: Joi.string().min(2).max(50),
    model: Joi.string().min(2).max(50),
    role: Joi.string().min(2).max(50),
    year: Joi.number().min(1900).max(2020),
    color: Joi.string().min(2).max(50),
    type: Joi.string().min(2).max(50)
  };

  return Joi.validate(req, schema);
}

module.exports = router;