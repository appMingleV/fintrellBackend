import {Router} from 'express';
import {addAssumption,getAssumptions,addCostOfProject,getCostOfProject,addMeansOfFinance,getMeansOfFinance,addFinancialData,getFinancialData} from '../../controllers/CMA/assumptions.js'
import {depCalc} from '../../controllers/CMA/calculation.js'
const router = Router();

router.post('/assumption',addAssumption);
router.get('/assumption/:enterpriseId',getAssumptions);
;
router.post('/costOfProject',addCostOfProject);
router.get('/costOfProject/:enterpriseId',getCostOfProject);


router.post('/meansOfFinance',addMeansOfFinance);
router.get('/meansOfFinance/:enterpriseId',getMeansOfFinance);


router.post('/profitLoss',addFinancialData);
router.get('/profitLoss/:enterpriseId',getFinancialData);

router.get('/depreciation/:enterpriseId',depCalc)

export default router;