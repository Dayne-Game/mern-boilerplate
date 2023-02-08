import express from 'express'
const router = express.Router();

import { refresh, logout } from '../controllers/AuthController.js';
import { jwtCookieeRequired } from '../middleware/AuthMiddleware.js';

router.route('/refresh').get(jwtCookieeRequired, refresh);
router.route('/logout').get(jwtCookieeRequired, logout);

export default router;
