import mongoose from "mongoose";


const breakEvenPointSchema=new mongoose.Schema({
    enterpriseId:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Enterprise',
      required: [true,"enterprise id is required"],
    },
    grossRevenue:{
        type:Number,
        required:[true,"Enter the value of gross revenue"]
    },
    variableExpeses:{
        Purchases:{type:Number,required:[true,"Enter the value of purchase"]},
        labourTransport:{type:Number,required:[true,"Enter the value of labour and transport"]},
        powerFuel:{type:Number,required:[true,"Enter the value of powerFuel"]},
        powerFuel:{type:Number,required:[true,"Enter the value of powerFuel"]},
        otherPrimeCost:{type:Number,required:[true,"Enter the value of otherPrime"]},
        differenceStock:{type:Number,required:[true,"Enter the value of difference stock"]},
        totalVariableExpenses:{type:Number,required:[true,"Enter the value of total variable expenses"]}
    },
    contribution:{
        type:Number,
        required:[true,"Enter the value of contribution"]
    },
    fixedSemiExpenses:{
        administratCost:{type:Number,required:[true,"Enter the value of administrat cost"]},
        rent:{type:Number,required:[true,"Enter the value of rent"]},
        insurance:{type:Number,required:[true,"Enter the value of insurance"]},
        propertyTax:{type:Number,required:[true,"Enter the value of property tax"]},
        otherFixedCost:{type:Number,required:[true,"Enter the value other fixed cost"]},
        totalFixedExpenses:{type:Number,required:[true,"Enter the value of total fixed expenses"]}
    },
    operatingProfit:{type:Number,required:[true,"Enter the value operating profit"]},
    breakEvenPoint:{type:Number,required:[true,"Enter the value break even point"]}
})

const breakEvenPoint=mongoose.model("breakEvenPoint",breakEvenPointSchema);

export default breakEvenPoint;