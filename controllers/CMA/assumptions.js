import assumption from "../../models/CMA/assumptions.js"
export const addAssumption=async(req,res)=>{
    try{
       const assumptiObj={...req.body};
       console.log(assumptiObj)
       const assumptData=await assumption.create(assumptiObj)
       if(!assumptData){
        return res.status(400).json({
            success:false,
            error: 'Failed to create assumption'
        })
       }
       return  res.status(200).json({
        success:true,
        data:assumptData
       })
    }catch(err){
        return res.status(200).json({
            success:false,
            error:err.message
        })
    }
}


export const getAssumptions=async(req,res)=>{
    try{
      const {enterpriseId}=req.params;
      const assumptData=await assumption.findOne({enterpriseId})
      if(!assumptData){
        return res.status(404).json({
            success:false,
            error: 'Assumptions not found'
        })
      }

      return res.status(200).json({
        success:true,
        data:assumptData
      })
    }catch(err){
        return res.status(200).json({
            success:false,
            error:err.message
        })
    }
}



//