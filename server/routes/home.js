import { Router } from 'express';
import { base } from '../utils/html';

const router = new Router();

// ------------------------------------
router.route('*').get((req, res) => {
  res.send(base());
});

export default router;
