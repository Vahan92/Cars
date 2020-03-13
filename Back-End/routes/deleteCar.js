const mongoose = require('mongoose');
const _ = require('lodash');
const { Car } = require('../models/cars');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

mongoose.set('useFindAndModify', false);

router.delete('/:_id', async (req, res) => {
  Car.findByIdAndRemove({ _id: ObjectId(req.params._id) })
    .exec(function (err, car) {
      if (err) {
        return res.json({ success: false, msg: 'Cannot remove car' });
      }
      if (!car) {
        return res.status(404).json({ success: false, msg: 'Car not found' });
      }
      return res.status(200).json({ success: true, msg: car });
    });

});

module.exports = router;