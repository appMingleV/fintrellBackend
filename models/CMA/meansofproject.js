import mongoose from 'mongoose'

const MeansOfFinanceSchema = new mongoose.Schema({
    enterpriseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true,"enterprise id is required"],
      },
    termLoan: {
        amount: { type: Number, required: true }, // Amount in Lakh
        roi: { type: Number, required: true }      // ROI in percentage
    },
    workingCapital: {
        amount: { type: Number, required: true }, // Amount in Lakh
        roi: { type: Number, required: true }      // ROI in percentage
    },
    governmentSubsidy: {
        amount: { type: Number, required: true } // Amount in Lakh
    },
    ourContribution: {
        amount: { type: Number, required: true } // Amount in Lakh
    }
}, { timestamps: true });

const MeansOfFinance = mongoose.model('MeansOfFinance', MeansOfFinanceSchema);

module.exports = MeansOfFinance;
