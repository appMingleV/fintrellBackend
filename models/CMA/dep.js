import mongoose from "mongoose";

const depSchema=new mongoose.Schema({
    enterpriseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true,"enterprise id is required"],
    },
    
})