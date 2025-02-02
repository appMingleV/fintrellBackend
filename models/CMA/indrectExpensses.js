import mongoose from "mongoose";


const indirectExpensesSchema = new mongoose.Schema({
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true, "enterprise id is required"],
    },
    accountingAudit: { type: Number, required: [true, "Enter the value for Accounting & Audit"] },
    bankCharges: { type: Number, required: [true, "Enter the value for Bank Charges"] },
    insuranceCharges: { type: Number, required: [true, "Enter the value for Insurance Charges"] },
    factoryExpenses: { type: Number, required: [true, "Enter the value for Factory Expenses"] },
    businessAdminExpenses: { type: Number, required: [true, "Enter the value for Business Admin Expenses"] },
    printingStationery: { type: Number, required: [true, "Enter the value for Printing & Stationery"] },
    professionalFees: { type: Number, required: [true, "Enter the value for Professional Fees"] },
    salaries: { type: Number, required: [true, "Enter the value for Salaries"] },
    travellingExpenses: { type: Number, required: [true, "Enter the value for Travelling Expenses"] },
    repairsMaintenance: { type: Number, required: [true, "Enter the value for Repairs & Maintenance"] },
    otherExpenses: { type: Number, required: [true, "Enter the value for Other Expenses"] },
    rentExpenses: { type: Number, required: [true, "Enter the value for rent Expenses"] },
    totalExpenses: { type: Number, required: [true, "Enter the total value of expenses"] },
})

const indirectExpenses=mongoose.model("IndirectExpenses",indirectExpensesSchema);
export default indirectExpenses;