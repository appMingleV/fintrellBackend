import mongoose from "mongoose";

const cashFlowSchema = new mongoose.Schema({
  enterpriseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: [true, "Enterprise ID is required"],
  },

  // Cash Flow from Operating Activities
  netProfitBeforeTax: { type: Number, required: true },
  depreciation: { type: Number, required: true },
  interestFinanceCharges: { type: Number, required: true },
  operatingProfitBeforeWorkingCapitalChanges: { type: Number, required: true },
  
  adjustmentsFor: {
    receivables: { type: Number, required: true },
    inventories: { type: Number, required: true },
    otherAssets: { type: Number, required: true },
    otherReceivables: { type: Number, required: true },
    advanceTaxPayments: { type: Number, required: true },
    payables: { type: Number, required: true },
    advancesFromCustomers: { type: Number, required: true },
    shortTermBorrowings: { type: Number, required: true },
    capitalGoodsCreditors: { type: Number, required: true },
  },

  cashGeneratedFromOperations: { type: Number, required: true },
  incomeTaxPaid: { type: Number, required: true },
  netCashFlowFromOperatingActivities: { type: Number, required: true },

  // Cash Flow from Investing Activities
  investingActivities: {
    cashCredit: { type: Number, required: true },
    ownContributionForBusiness: { type: Number, required: true },
    purchaseOfAssets: { type: Number, required: true },
    loanAndAdvances: { type: Number, required: true },
    investmentsOtherAssets: { type: Number, required: true },
  },
  netCashUsedInInvestingActivities: { type: Number, required: true },

  // Cash Flow from Financing Activities
  financingActivities: {
    loanDisbursementRepayment: { type: Number, required: true },
    drawingsByPromoters: { type: Number, required: true },
    interestPaidForCashCreditLimit: { type: Number, required: true },
    interestPaidForTermLoanLimit: { type: Number, required: true },
    capitalAccountItems: { type: Number, required: true },
    unsecuredLoansQuasiCapital: { type: Number, required: true },
  },
  netCashUsedInFinancingActivities: { type: Number, required: true },

  // Net Increase in Cash
  netIncreaseInCashEquivalents: { type: Number, required: true },
  cashEquivalentsAtBeginning: { type: Number, required: true },
  cashEquivalentsAtEnd: { type: Number, required: true },
  netIncreaseInCashEquivalentSAtEnd:{
    type:Number,
    default:function(){
      return  (this.cashEquivalentsAtBeginning||0)+ (this.cashEquivalentsAtEnd||0);
    }
  }                                                         
});

const CashFlow = mongoose.model("CashFlow", cashFlowSchema);

export default CashFlow;
