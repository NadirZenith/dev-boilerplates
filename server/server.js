// import util from 'util'
// import path from 'path'
// import fs from 'fs' //log
import serverConfig from './config';
import logger from './utils/logger';
import Express from 'express'

// Express --------------------------------------------
const app = Express()

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

// Express 404 -------------------------------------
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")

  logger('error_404').log('Not found')
})

// Express 500 -------------------------------------
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Express start ----------------------------------
app.listen(serverConfig.port, () => console.log(`Example app listening on port ${serverConfig.port}!`))

export default app;
