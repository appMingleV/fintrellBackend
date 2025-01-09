import mongoose from "mongoose";

const CostOfProjectSchema = new mongoose.Schema({
    enterpriseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true,"enterprise id is required"],
      },
  landAndPlot: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  buildingAndConstruction: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  plantAndMachinery: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  stock: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  computers: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  vehicles: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  equipment: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  otherAssets: {
    amount: { type: Number, required: true, default: 0 },
    rateOfDAP: { type: Number, required: true, default: 0 },
  },
  workingCapital: {
    amount: { type: Number, required: true, default: 0 },

  },
  totalProjectCost: {
    type: Number,
    required: true,
    default: 0,
  },
});

const costOfProject = mongoose.model('CostOfProject', CostOfProjectSchema);

export default costOfProject;