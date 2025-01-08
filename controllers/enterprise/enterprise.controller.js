
import Enterprise from "../../models/enterprise/enterprise.js";
export const enterprise=async(req,res)=>{
    try{
    const enterData={...req.body};
  
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
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}