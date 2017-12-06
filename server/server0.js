import util from 'util'
import path from 'path'
import fs from 'fs' //log

import Express from 'express'

// midleware
import morgan from 'morgan' // Express midleware log
import bodyParser from 'body-parser' // Express midleware request parser

// db
import mongoose from 'mongoose'

// logger
import logger from './utils/logger'

// config
import serverConfig from './config';

//routes
import mainRouter from './routes/main.routes';


// Express --------------------------------------------
const app = Express()
// var router = Express.Router();

// ---------- midlewares ------------------------------
app.use(morgan('tiny')) // Express midleware log
// app.use(morgan('combined'))
// app.use(bodyParser.urlencoded({
//   extended: true
// })) //Express midleware request parser

// ---------- routes ------------------------------
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));

app.use(mainRouter)

// mongoose.Promise = global.Promise;
// var promise = mongoose.createConnection(serverConfig.mongoURL, {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(db => {
//   if (!db) {
//     throw new Error('Error connection db!')
//   }
//
// }).catch(e => console.error('Please make sure Mongodb is installed and running!', e))

// Express 404 -------------------------------------
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

// Express 500 -------------------------------------
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Express start ----------------------------------
app.listen(3000, () => console.log('Example app listening on port 3000!'))
