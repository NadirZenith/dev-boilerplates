import LocalStrategy from 'passport-local'
import User from '../app/model/user'

export default new LocalStrategy({
  usernameField: 'email',
  // passwordField: 'passwd'
}, (email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, {message: 'Incorrect username.'})
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Incorrect password.'})
    }
    return done(null, user)
  })
})

