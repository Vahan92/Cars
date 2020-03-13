const Joi = require('joi');
const mongoose = require('mongoose');

const validateString = {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 50
}

const Car = mongoose.model('cars', new mongoose.Schema({
  brand: validateString,
  model: validateString,
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2020  
  },
  color: validateString,
  type: validateString
}));

function validateCar(car) {
  const schema = {
    brand: Joi.string().min(2).max(50).required(),
    model: Joi.string().min(2).max(50).required(),
    year: Joi.number().min(1900).max(2020).required(),
    color: Joi.string().min(2).max(50).required(),
    type: Joi.string().min(2).max(50).required()
  };
  return Joi.validate(car, schema);
}

exports.Car = Car;
exports.validateCar = validateCar;
