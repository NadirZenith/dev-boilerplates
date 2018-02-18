import { Router } from 'express';
import security from './security';
import error from './error';
import api from './api';
import admin from './admin';
import home from './home';
import profile from './profile';
import dev from './dev';
import {
  checkAuthentication, checkAuthenticationArea,
} from '../utils/authentication';
import authRoutes from './auth';

const router = new Router();

router.use('/auth', authRoutes);

router.use(security);

router.use('/api', api);
router.use('/admin', checkAuthenticationArea('admin'), admin);
router.use('/me', checkAuthentication, profile);
router.use('/dev', checkAuthenticationArea('dev'), dev);

router.use('/', home);

// handle error pages
router.use(error);

export default router;
