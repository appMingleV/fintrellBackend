import mongoose from "mongoose";

const AssumptionSchema = new mongoose.Schema({
  enterpriseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: [true,"enterprise id is required"],
  },  
  companyName: {
    type: String,
    required: [true,"company name is required"],
  },
  constitution: {
    type: [String],
    required: [true,"constitution is required"],
  },
  dateOfCommencement: {
    type: Date,
    required: [true,"date of commencement is required"],
  },
  disbursementMonthYear: {
    type: String,
    required: [true,], 
    match: /^(0[1-9]|1[0-2])-\d{4}$/,
  },
  disbursementYear: {
    type: Number,
    required: [true,"disbursement year is required"],
    min: 1900,
    max: new Date().getFullYear(),
  },
  moratoriumPeriod: {
    type: Number,
    required: [true,"moratorium period is required"],
    min: 0,
  },
  rateOfInterest: {
    type: Number,
    required: [true,"rate of interest is required"],
    min: 0,
  },
});

const assumption= mongoose.model('Assumption', AssumptionSchema);

export default assumption;