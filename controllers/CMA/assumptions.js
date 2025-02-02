import assumption from "../../models/CMA/assumptions.js"
import costOfProject from "../../models/CMA/costOfProject.js";
import MeansOfFinance from "../../models/CMA/meansofproject.js";
import FinancialData from "../../models/CMA/profitLoss.js";
import BreakEvenPoint from "../../models/CMA/breakEvenPoint.js";
import IndirectExpenses from "../../models/CMA/indrectExpensses.js";
import CashFlow from "../../models/CMA/cashFlow.js";
import BalanceSheet from "../../models/CMA/balanceSheet.js";
import CurrentRatio from "../../models/CMA/currentRatio.js";
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
        return res.status(200).json({
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


export const breakEvenPoint=async(req,res)=>{
       try{
        const {enterpriseId}=req.params;
        const breakObj={...req.body};
          
        const breakData=await BreakEvenPoint.findOne({enterpriseId});
        if(!breakData){
            
            const newDataBreakEvenPoint=await BreakEvenPoint.create({enterpriseId,...breakObj});
            if(!newDataBreakEvenPoint){
                return res.status(500).json({
                    status:false,
                    error: 'Failed to create break even point'
                })
            }
            return res.status(200).json({
                success: true,
                message:"Break even point created successfully",
                data: newDataBreakEvenPoint
            })
        }else{
            const updatedBreakEvenPoint=await BreakEvenPoint.findOneAndUpdate({enterpriseId},{...breakObj}, {new: true});
            if(!updatedBreakEvenPoint){
                return res.status(500).json({
                    status:false,
                    error: 'Failed to update break even point'
                })
            }
            return res.status(200).json({
                success: true,
                message:"Break even point successfully updated",
                data: updatedBreakEvenPoint
            })
        }


       }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Failed to calculate break even point'
        })
       }
}


export const getBreakEvenPoint = async (req, res) => {
    try {
        const { enterpriseId } = req.params;

        const breakEvenData = await BreakEvenPoint.findOne({ enterpriseId });

        if (!breakEvenData) {
            return res.status(404).json({
                success: false,
                error: 'Financial data not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: breakEvenData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


export const indrectExpensses=async(req,res)=>{
    try{
     const {enterpriseId}=req.params;
     const indirectObj={...req.body};
       
     const indirectExpensesData=await IndirectExpenses.findOne({enterpriseId});
     if(!indirectExpensesData){
         
         const newDataIndirectExpenses=await IndirectExpenses.create({enterpriseId,...indirectObj});
         if(!newDataIndirectExpenses){
             return res.status(500).json({
                 status:false,
                 error: 'Failed to create indirect expenses'
             })
         }
         return res.status(200).json({
             success: true,
             message:"indirect expenses point created successfully",
             data: newDataIndirectExpenses
         })
     }else{
         const updatedIndirectExpenses=await IndirectExpenses.findOneAndUpdate({enterpriseId},{...indirectObj}, {new: true});
         if(!updatedIndirectExpenses){
             return res.status(500).json({
                 status:false,
                 error: 'Failed to update indirect expenses'
             })
         }
         return res.status(200).json({
             success: true,
             message:"indirect expenses successfully updated",
             data: updatedIndirectExpenses
         })
     }


    }catch(err){
     return res.status(500).json({
         success: false,
         error: 'Failed to calculate indirect expenses'
     })
    }
}


export const getIndirectExpenses = async (req, res) => {
    try {
        const { enterpriseId } = req.params;

        const indirectExpensesData = await IndirectExpenses.findOne({ enterpriseId });

        if (!indirectExpensesData) {
            return res.status(404).json({
                success: false,
                error: 'indrect expenses data not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: indirectExpensesData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


export const cashFlow= async (req, res) => {
    try {
        const { enterpriseId } = req.params;
        const cashFlowData = { ...req.body };

        // Check if cash flow data exists for the given enterprise
        const existingCashFlow = await CashFlow.findOne({ enterpriseId });

        if (!existingCashFlow) {
            // Create new cash flow record if not found
            const newCashFlow = await CashFlow.create({ enterpriseId, ...cashFlowData });

            if (!newCashFlow) {
                return res.status(500).json({
                    success: false,
                    error: "Failed to create cash flow data",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Cash flow data created successfully",
                data: newCashFlow,
            });
        } else {
            // Update existing cash flow record
            const updatedCashFlow = await CashFlow.findOneAndUpdate(
                { enterpriseId },
                { ...cashFlowData },
                { new: true }
            );

            if (!updatedCashFlow) {
                return res.status(500).json({
                    success: false,
                    error: "Failed to update cash flow data",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Cash flow data updated successfully",
                data: updatedCashFlow,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Failed to process cash flow data",
        });
    }
};



export const getCashFlow = async (req, res) => {
    try {
        const { enterpriseId } = req.params;

        // Find cash flow data for the given enterprise ID
        const cashFlowData = await CashFlow.findOne({ enterpriseId });

        if (!cashFlowData) {
            return res.status(404).json({
                success: false,
                error: "Cash flow data not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: cashFlowData,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};


export const balanceSheet=async(req,res)=>{
        try{
            const {enterpriseId}=req.params;
            const balanceData={...req.body};
            const balanceSheetData=await BalanceSheet.findOne({enterpriseId});
            if(!balanceSheetData){
                
                const newDataBalanceSheet=await BalanceSheet.create({enterpriseId,...balanceData});
                if(!newDataBalanceSheet){
                    return res.status(500).json({
                        status:false,
                        message: 'Failed to create balance sheet',
                        error:err.message
                    })
                }
                return res.status(200).json({
                    success: true,
                    message:"Balance sheet created successfully",
                    data: newDataBalanceSheet
                })
            }else{
                const updatedBalanceSheet=await BalanceSheet.findOneAndUpdate({enterpriseId},{...balanceData}, {new: true});
                if(!updatedBalanceSheet){
                    return res.status(500).json({
                        status:false,
                        message: 'Failed to update balance sheet',
                        error:err.message
                    })
                }
                return res.status(200).json({
                    success: true,
                    message:"Balance sheet successfully updated",
                    data: updatedBalanceSheet
                })
            }
                   
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Failed to calculate balance sheet',
                error: err.message
            })
        }
}


export const getBalanceSheet=async(req,res)=>{
    try{
        const {enterpriseId}=req.params;
        const balanceSheetData=await BalanceSheet.findOne({enterpriseId});
        if(!balanceSheetData){
            return res.status(200).json({
                success: true,
                error: 'Balance sheet data not found'
            })
        }
        return res.status(200).json({
            success: true,
            message:"Balance sheet data successfully fetched",
            data: balanceSheetData
        })
        }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to calculate balance sheet',
            error: err.message
        })
    }
}


export const currentRatio=async(req,res)=>{
    try{
       const {enterpriseId} =req.params;
       const currentObj={...req.body};
       const currentRatioData=await CurrentRatio.findOne({enterpriseId});
       if(!currentRatioData){
        const newDataCurrentRatio=await CurrentRatio.create({enterpriseId,...currentObj});
        if(!newDataCurrentRatio){
            return res.status(500).json({
                status:false,
                message: 'Failed to create current ratio',
                error:err.message
            })
        }
        return res.status(200).json({
            success: true,
            message:"Current ratio created successfully",
            data: newDataCurrentRatio
        })
       }else{
        const updatedCurrentRatio=await CurrentRatio.findOneAndUpdate({enterpriseId},{...currentObj}, {new: true});
        if(!updatedCurrentRatio){
            return res.status(500).json({
                status:false,
                message: 'Failed to update current ratio',
                error:err.message
            })
        }
        return res.status(200).json({
            success: true,
            message:"Current ratio successfully updated",
            data: updatedCurrentRatio
        })
       }
    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: 'Failed to calculate current ratio',
            error: err.message
        })

    }
}


export const getCurrentRatio =async(req,res)=>{
        try{
             const {enterpriseId}=req.params;
             const currentRatioData=await CurrentRatio.findOne({enterpriseId});
          
             if(!currentRatioData){
                 return res.status(200).json({
                     success: true,
                     error: 'Current ratio data not found'
                 })
             }
             return res.status(200).json({
                 success: true,
                 message:"Current ratio data successfully fetched",
                 data: currentRatioData
             })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Failed to calculate current ratio',
                error: err.message
            })
        }
}