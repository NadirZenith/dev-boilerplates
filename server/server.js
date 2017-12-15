import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import mongoose from 'mongoose';
import Express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import flash from 'connect-flash';

import morgan from 'morgan'; // express midleware log
import bodyParser from 'body-parser'; // express midleware request parser

import config from '../config/webpack.config.dev';
import serverConfig from './config';
import mainRoutes from './routes/main.routes';


// Express --------------------------------------------
const app = Express();

// log
app.use(morgan('dev'));
// app.use(morgan('tiny'));
// app.use(morgan('combined'))

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// ------ dev
// Webpack Requirements
// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  // cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
} else {
  app.use(Express.static('dist/client'));
}


// db --------------------------------------------
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;


// session --------------------------------------------

// const MongoStore = require('connect-mongo')(session);
// const sess = {
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {},
//   store: new MongoStore({ mongooseConnection: mongoose.connection }),
// };
// app.use(session(sess));

const sessFile = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessFile));

app.use(flash());

// security -------------------------------------------
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  try {
    if (username === 'tino') {
      if (password === 'tino') {
        return done(null, { id: 1, secret: 'foo' });
      }
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, false, { message: 'User not found.' });
  } catch (err) {
    console.log(err)
    return done('unknown error');
  }

  // User.findOne({ username: username }, (err, user) => {
  //   if (err) { return done(err); }
  //   if (!user) {
  //     return done(null, false, { message: 'Incorrect username.' });
  //   }
  //   if (!user.validPassword(password)) {
  //     return done(null, false, { message: 'Incorrect password.' });
  //   }
  //   return done(null, user);
  // });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id === 1) {
    return done(null, { id: 1, name: 'tininho' });
  }
  return done('no match serializing');
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
});

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};


app.post('/login', passport.authenticate('local', {
  successRedirect: '/me',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.get('/login', (req, res) => {
  const message = req.flash('error');

  res.send(`
    <form action="/login" method="post">
    ${message}
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
  </form>`);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  const menu = req.isAuthenticated()
    ? '<a href="/me">Me</a>'
    : '<a href="/login">Login</a>';

  res.send(`
  ${menu}<br>
  Hello World!
  `);
});

app.get('/me', checkAuthentication, (req, res) => {
  const menu = '<a href="/logout">Logout</a>';

  res.send(`
  ${menu}<br>
  Hello ${req.user.name}!
  `);
});


// app.get(
//   '/api/me', passport.authenticate('local', { session: true }),
//   (req, res) => {
//     res.json(req.user);
//   },
// );


// ---------- routes ------------------------------
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));
// app.use(mainRoutes);

// Express start ----------------------------------
app.listen(serverConfig.port, () => {
  console.log(`Example app listening on port ${serverConfig.port}!`);
});

export default app;
