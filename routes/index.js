import {Router} from 'express';
import { enterprise } from '../controllers/enterprise/enterprise.controller.js';
const router = Router();

router.post('/enterprise',enterprise);

export default router;

