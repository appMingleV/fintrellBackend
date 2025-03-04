import mongoose from "mongoose"

const financialSchema = new mongoose.Schema({
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enterprise",
        required: [true, "Enterprise ID is required"],
    },
    financialData: [
        {
            domesticRevenue: { type: Number, required: true, default: 0 }, // Domestic Revenue
            otherIncome: { type: Number, required: true, default: 0 },     // Other Income
            cost: {
                openingStock: { type: Number, required: true, default: 0 },       // Opening Stock
                purchases: { type: Number, required: true, default: 0 },          // Purchases
                labourAndTransport: { type: Number, required: true, default: 0 }, // Labour and Transport
                powerAndFuel: { type: Number, required: true, default: 0 },       // Power and Fuel
                otherPriceCost: { type: Number, required: true, default: 0 },     // Other Price Cost
                closingStock: { type: Number, required: true, default: 0 },       // Closing Stock
                indirectExpenses: { type: Number, required: true, default: 0 },   // Indirect Expenses
                totalCost: {
                    type: Number,
                    default: function () {
                        return (
                            (this.openingStock || 0) +
                            (this.purchases || 0) +
                            (this.labourAndTransport || 0) +
                            (this.powerAndFuel || 0) +
                            (this.otherPriceCost || 0) +
                            (this.closingStock || 0) +
                            (this.indirectExpenses || 0)
                        );
                    }
                }
            },
            grossProfit: {
                type: Number,
                default: function () {
                    const revenue = (this.domesticRevenue || 0) + (this.otherIncome || 0);
                    return revenue - (this.cost?.totalCost || 0);
                }
            },
            EBITDA: {
                type: Number,
                default: function () {
                    return (this.grossProfit || 0) - (this.cost?.indirectExpenses || 0);
                }
            },
            otherIncomeEBI: { type: Number, required: true, default: 0 },
            interestAndFinancialCharge: {
                cashCredit: { type: Number, required: true, default: 0 }, // Cash Credit
                termLoan: { type: Number, required: true, default: 0 },   // Term Loan
                existingLoan: { type: Number, required: true, default: 0 }, // Existing Loan
                Depreciation: { type: Number, required: true, default: 0 },
                profitBeforeTax: { type: Number, required: true, default: 0 },
                provisionIncomeTax: { type: Number, required: true, default: 0 },
                profitAfterTax: { type: Number, required: true, default: 0 }
            }
        }
    ]
});

const FinancialTenure = mongoose.model("FinancialTenure", financialSchema);

export default FinancialTenure;
