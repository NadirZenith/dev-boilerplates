
import serverConfig from './config';
import Express from 'express'

// Express --------------------------------------------
const app = Express()

// ------ dev
// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  // cors
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}else{
  app.use(Express.static('dist/client'))
}

// ---------- midlewares ------------------------------
import morgan from 'morgan' // express midleware log
import bodyParser from 'body-parser' // express midleware request parser
app.use(morgan('tiny'))
// app.use(morgan('combined'))
app.use(bodyParser.urlencoded({
  extended: true
}))

// ---------- routes ------------------------------
import mainRoutes from './routes/main.routes';
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));
app.use(mainRoutes);

// Express start ----------------------------------
app.listen(serverConfig.port, () => console.log(`Example app listening on port ${serverConfig.port}!`))

export default app;
