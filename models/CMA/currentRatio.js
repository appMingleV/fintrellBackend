import mongoose from "mongoose";

const currentRatioSchema = new mongoose.Schema({
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true, "Enterprise ID is required"]
    },

    currentAssets: {
        cashAndBank: { type: Number, default: 0 },
        stockInHand: { type: Number, default: 0 },
        sundryDebtors: { type: Number, default: 0 },
        advances: { type: Number, default: 0 },
        deposits: { type: Number, default: 0 },
        securityDepositAndTDS: { type: Number, default: 0 },
        otherCurrentAssets: { type: Number, default: 0 },
        totalCurrentAssets: { type: Number, }
    },

    currentLiabilities: {
        cashCredit: { type: Number, default: 0 },
        sundryCreditors: { type: Number, default: 0 },
        provisions: { type: Number, default: 0 },
        otherCurrentLiabilities: { type: Number, default: 0 },
        totalCurrentLiabilities: { type: Number, default: 0 }
    },

    currentRatio: {
        type: Number,
        default: function () {
            return ((this.currentAssets.totalCurrentAssets||0) / this.currentLiabilities.totalCurrentLiabilities) || 0;
        }
    },

},{timestamps:true});

const currentRatio = mongoose.model('CurrentRatio', currentRatioSchema);

export default currentRatio;
