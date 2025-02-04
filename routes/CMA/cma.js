import {Router} from 'express';
import {addAssumption,getAssumptions,addCostOfProject,getCostOfProject,addMeansOfFinance,getMeansOfFinance,addFinancialData,getFinancialData,breakEvenPoint,indrectExpensses,getIndirectExpenses,cashFlow,getCashFlow} from '../../controllers/CMA/assumptions.js'
import {depCalc,EMICalcu} from '../../controllers/CMA/calculation.js'

import cma2 from './otherCma.js'
const router = Router();
router.use('/2',cma2)
router.post('/assumption',addAssumption);
router.get('/assumption/:enterpriseId',getAssumptions);
;
router.post('/costOfProject',addCostOfProject);
router.get('/costOfProject/:enterpriseId',getCostOfProject);


router.post('/meansOfFinance',addMeansOfFinance);
router.get('/meansOfFinance/:enterpriseId',getMeansOfFinance);


router.post('/profitLoss',addFinancialData);
router.get('/profitLoss/:enterpriseId',getFinancialData);

//break even point-->
router.post('/breakEvenPoint/:enterpriseId',breakEvenPoint);
router.get('/breakEvenPoint/:enterpriseId',breakEvenPoint);

//indirect expenses-->

router.post('/indirectExpenses/:enterpriseId',indrectExpensses);
router.get('/indirectExpenses/:enterpriseId',getIndirectExpenses);

//cash flow -->
router.post('/cashflow/:enterpriseId',cashFlow);
router.get('/cashflow/:enterpriseId',getCashFlow);



router.get('/depreciation/:enterpriseId',depCalc)
router.get('/emiCalc/:enterpriseId',EMICalcu)

export default router;