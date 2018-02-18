import jwt from 'jsonwebtoken';
import LocalStrategy from 'passport-local'

import User from '../app/model/user'

// const jwt = require('jsonwebtoken');
// const User = require('mongoose').model('User');
// const PassportLocalStrategy = require('passport-local').Strategy;
const secret = 'secret';


/**
 * Return the Passport Local Strategy object.
 */
export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ 'local.email': userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // if (!user.validPassword(password)) {
    //     return done(null, false, {message: 'Incorrect password.'})
    // }
    // return done(null, user)
//----
    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, secret);
      const data = {
        name: user.name
      };

      return done(null, token, data);
    });
  });
});
