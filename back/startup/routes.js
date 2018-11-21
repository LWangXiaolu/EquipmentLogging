const express = require('express');
const app = express();

const sensorRoutes = require('./../routes/sensors');
const authRoutes = require('./../routes/auth');

module.exports=function(app){
//cors
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/auth', authRoutes);

}
