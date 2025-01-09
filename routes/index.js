import {Router} from 'express';
import { enterprise } from '../controllers/enterprise/enterprise.controller.js';
import cma from './CMA/cma.js'
const router = Router();

router.post('/enterprise',enterprise);
router.use('/cma',cma)
export default router;

