import jwt from 'jsonwebtoken';
import LocalStrategy from 'passport-local';

import config from '../config';
import User from '../app/model/user';


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
    local: {
      email: email.trim(),
      password: password.trim(),
      username: req.body.username.trim(),
    },
  };


    User.findOne({ 'local.username': userData.local.username }, (err, user) => {
      if (err) { return done(err); }

      if (user) {
          const error = new Error('Username already taken');
          error.name = 'UsernameAlreadyTaken';

          return done(error);
      }

      const newUser = new User(userData);
      newUser.save((err) => {
        if (err) { return done(err); }

        return done(null);
      });

    });

});