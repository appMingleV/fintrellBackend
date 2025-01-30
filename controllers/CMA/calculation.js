import { depCalculation } from "../../service/depCalculation.js";
export const depCalc=async (req,res)=>{
    try{
        const {enterpriseId}=req.params;
       const calculation= await depCalculation(enterpriseId);
       
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