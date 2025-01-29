
import Enterprise from "../../models/enterprise/enterprise.js";
export const enterprise=async(req,res)=>{
    try{
    const enterData={...req.body};

    if(!enterData.id){
    const newEnterprise=await Enterprise.create(enterData);
    if(!newEnterprise){
        return res.status(400).json({
            success:false,
            error: 'Failed to create enterprise'
        })
    }
    res.status(201).json({
        success: true,
        data: newEnterprise
    })
}else{
    
    const updatedEnterprise=await Enterprise.findByIdAndUpdate(enterData.id,enterData,{new:true});
    if(!updatedEnterprise){
        return res.status(404).json({
            success:false,
            error: 'Enterprise not found'
        })
    }
    return res.status(200).json({
        success: true,
        data: updatedEnterprise
    })
}
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
    
}


export const getEnterprise=async(req,res)=>{
    try{
        const {enterpriseId}=req.params;
      const enterDate=await Enterprise.findById(enterpriseId);

      if(!enterDate){
        return res.status(404).json({
            success:false,
            error: 'Enterprise not found'
        })
      }
      return res.status(200).json({
        success: true,
        data: enterDate
      })
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}