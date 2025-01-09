import assumption from "../../models/CMA/assumptions.js"
import costOfProject from "../../models/CMA/costOfProject.js";
import MeansOfFinance from "../../models/CMA/meansofproject.js";
import FinancialData from "../../models/CMA/profitLoss.js";
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
        return res.status(500).json({
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
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

export const addCostOfProject = async (req, res) => {
    try {
        const costObj = { ...req.body };

        const costData = await costOfProject.create(costObj);

        if (!costData) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create Cost of Project'
            });
        }

        return res.status(200).json({
            success: true,
            data: costData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// Get Cost of Project by enterpriseId
export const getCostOfProject = async (req, res) => {
    try {
        const { enterpriseId } = req.params;
        const costData = await costOfProject.findOne({ enterpriseId });

        if (!costData) {
            return res.status(404).json({
                success: false,
                error: 'Cost of Project not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: costData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


export const addMeansOfFinance = async (req, res) => {
    try {
        const meansOfFinanceObj = { ...req.body };
        console.log(meansOfFinanceObj);

        const meansData = await MeansOfFinance.create(meansOfFinanceObj);

        if (!meansData) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create Means of Finance record'
            });
        }

        return res.status(200).json({
            success: true,
            data: meansData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// Get Means of Finance by Enterprise ID
export const getMeansOfFinance = async (req, res) => {
    try {
        const { enterpriseId } = req.params;

        const meansData = await MeansOfFinance.findOne({ enterpriseId });

        if (!meansData) {
            return res.status(404).json({
                success: false,
                error: 'Means of Finance not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: meansData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};




export const addFinancialData = async (req, res) => {
    try {
        const financialDataObj = { ...req.body };
        console.log(financialDataObj);

        const financialData = await FinancialData.create(financialDataObj);

        if (!financialData) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create financial data record'
            });
        }

        return res.status(200).json({
            success: true,
            data: financialData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// Get Financial Data by Enterprise ID
export const getFinancialData = async (req, res) => {
    try {
        const { enterpriseId } = req.params;

        const financialData = await FinancialData.findOne({ enterpriseId });

        if (!financialData) {
            return res.status(404).json({
                success: false,
                error: 'Financial data not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: financialData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};