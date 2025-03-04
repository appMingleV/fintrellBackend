import {Router} from 'express';
import {addAssumption,getAssumptions,addCostOfProject,getCostOfProject,addMeansOfFinance,getMeansOfFinance,addFinancialData,getFinancialData,breakEvenPoint,indrectExpensses,getIndirectExpenses,cashFlow,getCashFlow,createOrUpdateFormData,getFormData,tenurFinancialData} from '../../controllers/CMA/assumptions.js'    
import { 
    createPrepared, 
    getAllPrepared, 
    getPreparedById, 
    updatePrepared, 
    deletePrepared 
  } from "../../controllers/CMA/prepared.js";
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
router.get('/tenure/profitLoss/:enterpriseId',tenurFinancialData);

//break even point-->
router.post('/breakEvenPoint/:enterpriseId',breakEvenPoint);
router.get('/breakEvenPoint/:enterpriseId',breakEvenPoint);

//indirect expenses-->

router.post('/indirectExpenses/:enterpriseId',indrectExpensses);
router.get('/indirectExpenses/:enterpriseId',getIndirectExpenses);

//cash flow -->
router.post('/cashflow/:enterpriseId',cashFlow);
router.get('/cashflow/:enterpriseId',getCashFlow);

router.post('/cma/:enterpriseId',createOrUpdateFormData)
router.get('/cma/:enterpriseId',getFormData)

router.get('/depreciation/:enterpriseId',depCalc)
router.get('/emiCalc/:enterpriseId',EMICalcu)

router.post("/prepared", createPrepared);  // Create a new record
router.get("/prepared", getAllPrepared);   // Get all records
router.get("/prepared/:id", getPreparedById); // Get record by ID
router.put("/prepared/:id", updatePrepared);  // Update record by ID
router.delete("/prepared/:id", deletePrepared); 

export default router;