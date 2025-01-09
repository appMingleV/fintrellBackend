import {Router} from 'express';
import {addAssumption,getAssumptions} from '../../controllers/CMA/assumptions.js'
const router = Router();

router.post('/assumption',addAssumption);
router.get('/assumption',getAssumptions);
export default router;