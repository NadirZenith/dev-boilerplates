import jwt from 'jsonwebtoken';
import User from '../app/model/user';
import config from '../config';


/**
 *  The Auth Checker middleware function.
 */
export const checkBearerTokenAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string
  // like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.security.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // pass user details onto next route
      req.user = user;
      return next();
    });
  });
};


export const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Auth failed');
    res.redirect('/login-form');
  }
};


export const checkAuthenticationArea = area => (req, res, next) => {
  if (req.isAuthenticated()
        && area in config.security.areas
        && config.security.areas[area].includes(req.user.username)) {
    next();
  } else {
    req.flash('error', 'Restricted area');
    res.redirect('/login-form');
  }
};

