import { Router } from 'express';
import logger from '../utils/logger';
import { base } from '../utils/html';

const router = new Router();

// Express 404 -------------------------------------
router.use((req, res, next) => {
  res.status(404).send(base('', '<p>404<br>Sorry can\'t find that!</p>'));

  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  logger('error_404').log(`Not found:  ${fullUrl}`);
});

// Express 500 -------------------------------------
router.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
  console.error(err.stack);
});

export default router;
