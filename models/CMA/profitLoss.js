import mongoose from "mongoose";

const FinancialDataSchema = new mongoose.Schema({
    domesticRevenue: { type: Number, required: true }, // Domestic Revenue
    otherIncome: { type: Number, required: true },     // Other Income
   enterpriseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: [true,"enterprise id is required"],
  },
    cost: {
        openingStock: { type: Number, required: true },       // Opening Stock
        purchases: { type: Number, required: true },          // Purchases
        labourAndTransport: { type: Number, required: true }, // Labour and Transport
        powerAndFuel: { type: Number, required: true },       // Power and Fuel
        otherPriceCost: { type: Number, required: true },     // Other Price Cost
        closingStock: { type: Number, required: true },       // Closing Stock
        indirectExpenses: { type: Number, required: true },   // Indirect Expenses
        totalCost:{
            type:Number,
            default:function(){
                let sum=+(this.openingStock+this.purchases+this.labourAndTransport+this.powerAndFuel+this.otherPriceCost+this.closingStock+this.indirectExpenses);
                return sum;
            }
        }
    },
    grossProfit:{
        type:Number,
        default:function(){
            let sum=+(this.domesticRevenue+this.otherIncome);
             return +(sum-this.cost.totalCost);
        }
    },
    EBITDA:{
        type:Number,
        default:function(){
            let sum=+(this.grossProfit-this.cost.indirectExpenses)
            return sum;
        }
    },
    otherIncomeEBI:{
        type:Number,
        default:0
    },
    
    interestAndFinancialCharge: {
        cashCredit: { type: Number, required: true }, // Cash Credit
        termLoan: { type: Number, required: true },   // Term Loan
        existingLoan: { type: Number, required: true }, // Existing Loan
        Depreciation:{type:Number,required: true},
        profitBeforeTax:{type:Number,required: true},
        provisionIncomeTax:{type:Number,required: true},
        profitAfterTax:{type:Number,required: true}
    }
}, { timestamps: true });

const FinancialData = mongoose.model('FinancialData', FinancialDataSchema);

export default  FinancialData;
