const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys_dev');
const passport = require('passport');

// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

const { User, validateUser } = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post('/register', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  User.findOne({ email: req.body.email }).then(user => {
  if (user) return res.status(400).send('User already registered.');

  const newUser = new User(_.pick(req.body, ['name', 'email', 'password']));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    })
});

router.post('/login', (req, res) => {
  const { errors } = validateUser(req.body);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).send('User not found');

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name }; 

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).send('Password incorrect');
      }
    });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
