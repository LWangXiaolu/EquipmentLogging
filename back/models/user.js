const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024 //this is length of the hashed password
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  //header+content+ signature, using your system environment variable only you know to secure the token
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),//name should be more between 5 to 50 char and required
    password: Joi.string().min(5).max(255).required() //user sent in plain text
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
