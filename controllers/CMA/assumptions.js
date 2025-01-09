import assumption from "../../models/CMA/assumptions"
export const addAssumption=async(req,res)=>{
    try{
       const assumptiObj={...req.body};
       const assumption=await assumption.create(assumptiObj)
    //    if(!assumption)
    }catch(err){
        return 
    }
}