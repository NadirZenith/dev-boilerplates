import { Router } from 'express';

const router = new Router();

router.route('/status').get((req, res) => {
  res.json({ msg: 'admin status ok' });
});

export default router;
