import LocalStrategy from 'passport-local';
import User from '../app/model/user';


export default new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  ((req, email, password, done) => {
    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash(
          'error',
          'That email is already in use.',
        ));
      }
      const newUser = new User();
      newUser.local.email = email;
      newUser.local.username = req.body.username;
      newUser.local.password = newUser.generateHash(password);
      newUser.save((err2) => {
        if (err2) {
          throw err2;
        }
        return done(null, newUser);
      });
    });
  }),
);

// passport.use('local-login', new LocalStrategy({
//   usernameField: 'email',
//   // passwordField: 'passwd'
// }, (email, password, done) => {
//   User.findOne({ 'local.email': email }, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     if (!user.validPassword(password)) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   });
// }));

// passport.serializeUser((user, done) => {
//   // done(null, user.local.email);
//   done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//   User.findOne({ _id: id }, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     //
//     if (!user) {
//       // return done (true, false)
//       return done('no match serializing');
//     }
//
//     return done(null, { username: user.local.username, id: user._id });
//   });
// });
