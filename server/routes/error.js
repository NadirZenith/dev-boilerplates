import { Router } from 'express';
import logger from '../utils/logger';
import { base } from '../utils/html';

const router = new Router();

// Express 404 -------------------------------------
router.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  logger('error_404').log(`Not found:  ${fullUrl}`);

  return res.status(404).send(base('', '<p>404<br>Sorry can\'t find that!</p>'));
});

// Express 500 -------------------------------------
router.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send('Something broke!');
});

export default router;
