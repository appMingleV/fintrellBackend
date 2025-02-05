import { Router } from "express";
import {balanceSheet,getBalanceSheet,currentRatio,getCurrentRatio} from '../../controllers/CMA/assumptions.js'
const router = Router();


//balance sheet -->
router.post('/balanceSheet/:enterpriseId',balanceSheet);
router.get('/balanceSheet/:enterpriseId',getBalanceSheet);

//current Ratio-->
router.post('/currentRatio/:enterpriseId',currentRatio);
router.get('/currentRatio/:enterpriseId',getCurrentRatio);

//sensitivity -->
router.post('/sensitivity/:enterpriseId',getCurrentRatio);
router.get('/sensitivity/:enterpriseId',getCurrentRatio);


export default router;