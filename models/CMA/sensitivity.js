import mongoose from "mongoose";

const financialScenarioSchema = new mongoose.Schema({
    enterpriseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true,"enterprise id is required"],
      },
  scenarioType: {
    type: String,
    enum: ['REVENUE_GROWTH', 'REVENUE_REDUCTION', 'INCREASE_IN_COGS'],
    required: true
  },
  revenurGrowthdetails: {
    projectedRevenue: { type: Number, required: true },
    percentageChange: { type: Number, required: true },
    changeAmount: { type: Number, required: true }, // Growth, Reduction, or Increase
    updatedRevenueOrCOGS: { type: Number, required: true },
    costOfGoodsSold: { type: Number, required: true },
    indirectCosts: { type: Number, required: true },
    interestDepreciation: { type: Number, required: true },
    ebt: { type: Number, required: true }, // Earnings Before Tax
    updatedEBT: { type: Number, required: true },
    impactOnEBT: { type: Number, required: true }
  },
  revenueReduction: {
    projectedRevenue: { type: Number, required: true },
    percentageChange: { type: Number, required: true },
    changeAmount: { type: Number, required: true }, // Growth, Reduction, or Increase
    updatedRevenueOrCOGS: { type: Number, required: true },
    costOfGoodsSold: { type: Number, required: true },
    indirectCosts: { type: Number, required: true },
    interestDepreciation: { type: Number, required: true },
    ebt: { type: Number, required: true }, // Earnings Before Tax
    updatedEBT: { type: Number, required: true },
    impactOnEBT: { type: Number, required: true }
  },
  increasesInCOG: {
    projectedRevenue: { type: Number, required: true },
    percentageChange: { type: Number, required: true },
    changeAmount: { type: Number, required: true }, // Growth, Reduction, or Increase
    updatedRevenueOrCOGS: { type: Number, required: true },
    costOfGoodsSold: { type: Number, required: true },
    indirectCosts: { type: Number, required: true },
    interestDepreciation: { type: Number, required: true },
    ebt: { type: Number, required: true }, // Earnings Before Tax
    updatedEBT: { type: Number, required: true },
    impactOnEBT: { type: Number, required: true }
  },

},{timestamps: true});

const sensitive= mongoose.model('Sensitive', financialScenarioSchema);
export default sensitive;