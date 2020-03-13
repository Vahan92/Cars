const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const addCar = require('./routes/addCar');
const getCars = require('./routes/getCars');
const deleteCar = require('./routes/deleteCar');
const deleteMany = require('./routes/deleteMany');
const updateCar = require('./routes/updateCar');
const express = require('express');
const app = express();
const cors = require('cors');

mongoose.connect("mongodb+srv://vahan:iamvahan@vehicles-6jzyi.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(cors());
app.use(express.json());
app.use('/api/addCar', addCar);
app.use('/api/getCars', getCars);
app.use('/api/deleteMany', deleteMany);
app.use('/api/deleteCar', deleteCar);
app.use('/api/updateCar', updateCar);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));