import { depCalculation } from "../../service/depCalculation.js";
import EMI from '../../service/EMICalculation.js'
export const depCalc=async (req,res)=>{
    try{
        const {enterpriseId}=req.params;
        if(!enterpriseId){
            return res.status(400).json({
                success: false,
                error: 'Missing required parameter: enterpriseId'
            })
        }
       const calculation= await depCalculation(enterpriseId);
       
       if(!calculation){
        return res.status(500).json({
            status:false,
            message: 'Failed to calculate Depreciation budget'
        })
       }
        console.log(calculation)
         return res.status(200).json({
            success: true,
            message: 'Departmental budget calculated successfully',
            data:calculation
        })
    }catch(err){
          return res.status(500).json({
            success: false,
            error: 'Failed to calculate departmental budget',
            message: err.message
          })
    }
}


export const EMICalcu=async(req,res)=>{
    try{
        const {enterpriseId} = req.params;
        if(!enterpriseId)return  res.status(400).json({
            success: false,
            message: 'Missing required parameter: enterpriseId',
            error:err.message
        })
         console.log("EnterprisId---> ",enterpriseId)
        const EMICal=await EMI(enterpriseId);
      
        if(!EMICal)return res.status(200).json({
            success: false,
            message: 'Failed to calculate EMI',
            error: err.message
        })
        return res.status(200).json({
            success: true,
            message: 'EMI calculated successfully',
            data: EMICal
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            error: 'Failed to calculate EMI',
            message: err.message
        })
    }
}