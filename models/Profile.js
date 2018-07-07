const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  githubusername: {
    type: String
  },
  bio: {
    type: String
  }
});

const Profile = mongoose.model('profiles', profileSchema);

function validateProfile(profiles) {
  const schema = Joi.object({
      name: Joi.string().min(3).max(2500).required(),
      dateOfBirth: Joi.date().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      location: Joi.string().required(),
      education: Joi.string().required(),
      skills: Joi.string().required(),
      githubusername: Joi.string().required(),
      bio: Joi.string().required()
  });

  return Joi.validate(profiles, schema);
}

exports.Profile = Profile;
exports.validateProfile = validateProfile;