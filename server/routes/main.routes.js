import {Router} from 'express';
import {
    checkBearerTokenAuthentication,
    checkAuthentication,
    checkAuthenticationArea
} from '../middleware/auth-check';
import security from './security';
import error from './error';
import api from './api';
import admin from './admin';
import home from './home';
import profile from './profile';
import dev from './dev';
import authRoutes from './auth';

const router = new Router();

router.use('/auth', authRoutes);

router.use(security);

router.use('/api', checkBearerTokenAuthentication);

router.use('/api', api);

router.use('/admin', checkAuthenticationArea('admin'), admin);

// @todo implement cascade validation
// works only with token or cookie, not both
// its ok for a react app though
router.use('/me', checkBearerTokenAuthentication);
router.use('/me', profile);
// router.use('/me', checkAuthentication, profile);

router.use('/dev', checkAuthenticationArea('dev'), dev);

router.use('/', home);

// handle error pages
router.use(error);

export default router;
