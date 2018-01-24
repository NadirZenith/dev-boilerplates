import { Router } from 'express';
import logger from '../utils/logger';
import { base } from '../utils/html';

const router = new Router();

// Express 404 -------------------------------------
router.use((req, res, next) => {
  res.status(404).send(base('', 'Sorry can\'t find that!'));

  // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  // logger('error_404').log(`Not found:  ${fullUrl}`);
  logger('error_404').log(`Not found:  ${req.protocol}://${req.get('host')}${req.originalUrl}`);
});

// Express 500 -------------------------------------
router.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
  console.error(err.stack);
});

export default router;
