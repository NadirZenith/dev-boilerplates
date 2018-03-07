import { Router } from 'express';

const router = new Router();

router.route('/status').get((req, res) => {
    return res.json({ msg: 'api status ok' });
});

router.get('/dashboard', (req, res) => {
    return res.status(200).json({
        message: "You're authorized to see this secret message.",
        // user values passed through from auth middleware
        user: req.user
    });
});

export default router;
