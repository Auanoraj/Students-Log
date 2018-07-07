const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
require('express-async-errors');

const { Profile, validateProfile } = require('../../models/Profile')
const { User } = require('../../models/User');


router.get('/test', (req, res) => res.send({ msg: 'Profile Works' }));


router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name'])
    .then(profiles => {
      if (!profiles) return res.status(404).send('There are no profiles');

      res.send(profiles);
    })
    .catch(err => res.status(404).send({ profile: 'There are no profiles' }));
});

router.get('/name/:name', (req, res) => {
  const errors = {};

  Profile.findOne({ name: req.params.name })
    .populate('user', ['name'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { error } = validateProfile(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.dateOfBirth) profileFields.dateOfBirth = req.body.dateOfBirth;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.education) profileFields.education = req.body.education;
    if (req.body.skills) profileFields.skills = req.body.skills;
    if (req.body.githubusername)
        profileFields.githubusername = req.body.githubuseexperience
    if (req.body.bio) profileFields.bio = req.body.bio;


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.send(profile));
      } else {
        Profile.findOne({ user: profileFields.user }).then(profile => {
          if (profile) return res.status(400).send('This user already exists');

          new Profile(profileFields).save().then(profile => res.send(profile));
        });
      }
    });
  }
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.send({ success: true })
      );
    });
  }
);

module.exports = router;
