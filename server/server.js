import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import mongoose from 'mongoose';
import Express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import flash from 'connect-flash';

import morgan from 'morgan'; // express middleware log
import bodyParser from 'body-parser'; // express middleware request parser

import config from '../config/webpack.config.dev';
import serverConfig from './config';
import mainRoutes from './routes/main.routes';
import localFormSignupStrategy from './passport/local-form-signup';
import localFormLoginStrategy from './passport/local-form-login';
import localApiLoginStrategy from './passport/local-api-login';
import localApiSignupStrategy from './passport/local-api-signup';
import User from './app/model/user';

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
if (serverConfig.env === 'development') {
  console.log(serverConfig);
  // cors, before other middleware to avoid cors errors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

} else {
  app.use(Express.static('dist/client'));
}


// db --------------------------------------------
mongoose.connect(serverConfig.db.uri, { useMongoClient: true }, (error) => {
  if (error) {
    console.log('-------------------- MONGO ERROR -------------------');
    console.log(error);
  }
});
mongoose.Promise = global.Promise;


// session --------------------------------------------
const MongoStore = require('connect-mongo')(session);

const sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};
app.use(session(sess));

// const sessFile = {
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// };
// app.use(session(sessFile));

// flash messages
app.use(flash());

// security -------------------------------------------
// load passport strategies
passport.use('local-api-signup', localApiSignupStrategy);
passport.use('local-api-login', localApiLoginStrategy);
passport.use('local-form-signup', localFormSignupStrategy);
passport.use('local-form-login', localFormLoginStrategy);

passport.serializeUser((user, done) => {
  // done(null, user.local.email);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return done(err);
    }
    //
    if (!user) {
      // return done (true, false)
      return done('no match serializing');
    }

    return done(null, { username: user.local.username, id: user._id });
  });
});

app.use(passport.initialize());
app.use(passport.session());

// ---------- routes ------------------------------
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));
app.use(mainRoutes);

// Express start ----------------------------------
app.listen(serverConfig.port, () => {
  console.log(`Example app listening on port ${serverConfig.port}!`);
});

export default app;
