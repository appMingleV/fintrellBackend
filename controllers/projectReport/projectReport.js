import projectRe from "../../models/projectReport/projectReport.js";
export const projectrepoer=async(req,res)=>{
    try{
        const {enterpriseId}=req.params;
        const {content}=req.body;
        
     
        const projectReportContent=await projectRe.create({content,image:req.file.filename});
        
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
            error: 'Failed to get project report'
        })
    }
}