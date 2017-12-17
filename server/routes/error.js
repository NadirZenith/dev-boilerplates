import { Router } from 'express';
import logger from '../utils/logger';

const router = new Router();

// Express 404 -------------------------------------
router.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")

  logger('error_404').log('Not found')
})

// Express 500 -------------------------------------
router.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export default router;
