import { Router } from 'express';
import { user_list } from '../controllers/userController.js';

const router = Router();

router.get('/', user_list);

export default router;
