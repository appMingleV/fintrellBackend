import projectRe from "../../models/projectReport/projectReport.js";
import Enterprise from '../../models/enterprise/enterprise.js';
export const projectrepoer=async(req,res)=>{
    try{
  
        const {enterpriseId,content,typeOfContent}=req.body
       
        const enterpriseDetails=await Enterprise.findById(enterpriseId);
        if(!enterpriseDetails){
            return res.status(400).json({
                success: false,
                error: 'Invalid enterpriseId'
            })
        }
        const projectReportContent=await projectRe.create({enterpriseId,content,image:req?.file?.filename,typeOfContent});
        
        if(!projectReportContent){
            return res.status(400).json({
                success: false,
                error: 'Failed to create project report'
            });
        }
      return res.status(200).json({
        success: true,
        data: projectReportContent
      })
     
    }catch(err){
        return res.status(500).json({
            success:false,
            error: 'Failed to get project report',
            message:err.message
        })
    }
}


export const getProjectReport=async(req,res)=>{
    try{
      const {enterpriseId}=req.params;
      const {typeOfContent}=req.body;
       if(!typeOfContent)return res.status(400).json({
        success: false,
        error: 'content type is required'
       })
      const enterpriseDetails=await Enterprise.findById(enterpriseId);
      if(!enterpriseDetails){
          return res.status(400).json({
              success: false,
              error: 'Invalid enterpriseId'
          })
      }
      const projectReportContent=await projectRe.findOne({enterpriseId,typeOfContent});
   
      if(!projectReportContent){
        return res.status(404).json({
            success: false,
            error: 'Project report not found'
        })
      }
      return res.status(200).json({
        success: true,
        data: projectReportContent
      })
    }catch(err){
          return res.status(500).json({
            success:false,
            error: 'Failed to get project report',
            message:err.message
          })
    }
}
