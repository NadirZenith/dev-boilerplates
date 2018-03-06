import {Router} from 'express';
import User from '../app/model/user';

const router = new Router();

router.route('/status').get((req, res) => {
    return res.json({msg: 'dev status ok'});
});

export default router;
