const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', userSchema);

function validateUser(users) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    confirmPassword: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(users, schema);
}

exports.User = User; 
exports.validateUser = validateUser;
