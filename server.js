const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require('./config/keys_dev').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
