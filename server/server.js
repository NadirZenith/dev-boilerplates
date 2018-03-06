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

import webpackConfig from '../config/webpack.config.dev';
import config from './config';
import mainRoutes from './routes/main.routes';
import localFormSignupStrategy from './passport/local-form-signup';
import localFormLoginStrategy from './passport/local-form-login';
import localApiLoginStrategy from './passport/local-api-login';
import localApiSignupStrategy from './passport/local-api-signup';
import User, {serializeUser, deserializeUser} from './app/model/user';

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
if (config.env === 'development') {
  console.log(config);
  // cors, before other middleware to avoid cors errors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

} else {
  app.use(Express.static('dist/client'));
}


// db --------------------------------------------
mongoose.connect(config.db.uri, { useMongoClient: true }, (error) => {
  if (error) {
    console.log('-------------------- MONGO ERROR -------------------');
    console.log(error);
  }
});
mongoose.Promise = global.Promise;

// session --------------------------------------------
// session in mongo db
const MongoStore = require('connect-mongo')(session);
const sess = {
  secret: config.security.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};
app.use(session(sess));

// session in file
// const sessFile = {
//   secret: config.security.session.secret,
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

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(passport.initialize());
app.use(passport.session());

// ---------- routes ------------------------------
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));
app.use(mainRoutes);

// Express start ----------------------------------
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});

export default app;
