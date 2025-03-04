import mongoose from "mongoose";

const yearlyBalanceSheetSchema = new mongoose.Schema({

  liabilities: {
    debtLiabilities: {
      debtLiabilities: { type: Number, required: [true, "Enter a debt Liabilities"] },
      existingLoans: { type: Number, required: [true, "Enter existing Loans"] },
      totalSecuredLoans: Number,
      unsecuredLoans: Number,
      governmentFunds: Number,
      totalUnsecuredLoans: Number,
      totalOutsideLiabilities: Number
    },
    currentLiabilities: {
      cashCredit_OD_DLOD: Number,
      sundryCreditors: Number,
      provisions: Number,
      otherCurrentLiabilities: Number,
      totalCurrentLiabilities: Number
    },
    totalOutsideLiabilities: Number,
    netWorth: {
      capitalBalance: Number,
      openingBalance: Number,
      ownContribution: Number,
      surplusOrDeficit: Number,
      drawings: Number,
      anyOtherItem: Number,
      subTotal: Number
    },
    totalLiabilities: Number
  },
  assets: {
    currentAssets: {
      cashAndBank: Number,
      stockInHand: Number,
      sundryDebtorsAndReceivables: Number,
      loansAndAdvances: Number,
      deposits: Number,
      securityDepositAndTDS: Number,
      exportAndOtherReceivables: Number,
      otherCurrentAssets: Number,
      subTotal: Number
    },
    investments: Number,
    otherNonCurrentAssets: Number,
    fixedAssets: {
      grossBlock: Number,
      addition: Number,
      depreciation: Number,
      netBlock: Number
    },
    totalAssets: Number
  }
});

const balanceSheetSchema = new mongoose.Schema({
  enterpriseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: [true, "Enterprise ID is required"]
  },
  yearlyData: [yearlyBalanceSheetSchema], // Array of yearly balance sheets
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BalanceSheet = mongoose.model("BalanceSheet", balanceSheetSchema);
export default BalanceSheet;
