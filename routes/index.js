import {Router} from 'express';
import { enterprise ,getEnterprise} from '../controllers/enterprise/enterprise.controller.js';
import cma from './CMA/cma.js'
import projectReport from './projectReport/projectreport.js';
const router = Router();

router.post('/enterprise',enterprise);
router.get('/c/:enterpriseId',getEnterprise)
router.use('/cma',cma)
router.use('/prjectreport',projectReport)
export default router;

