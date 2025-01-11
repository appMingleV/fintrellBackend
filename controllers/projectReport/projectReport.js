import projectRe from "../../models/projectReport/projectReport.js";
export const projectrepoer=async(req,res)=>{
    try{
        const {enterpriseId}=req.params;
        const {content}=req.body;
        
        console.log(req?.file?.filename);
        const projectReportContent=await projectRe.create({content,image:req?.file?.filename});
        
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
      const {id}=req.params;
      const projectReportContent=await projectRe.findById(id);
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
