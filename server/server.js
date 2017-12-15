import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import mongoose from 'mongoose';
import Express from 'express';
import session from 'express-session';

import morgan from 'morgan'; // express midleware log
import bodyParser from 'body-parser'; // express midleware request parser

import config from '../config/webpack.config.dev';
import serverConfig from './config';
import mainRoutes from './routes/main.routes';


// Express --------------------------------------------
const app = Express();

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


// ---------- midlewares ------------------------------
// session
const MongoStore = require('connect-mongo')(session);

const sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

app.use(session(sess));


// log
app.use(morgan('tiny'));
// app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));

// ---------- routes ------------------------------
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));
app.use(mainRoutes);

// Express start ----------------------------------
app.listen(serverConfig.port, () => {
  console.log(`Example app listening on port ${serverConfig.port}!`);
});

export default app;
