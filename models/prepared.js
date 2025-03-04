import mongoose from "mongoose";



const preparedSchema=new mongoose.Schema({
    enterpriseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: [true,"enterprise id is required"],
    },
    preparedBy: {
        type: String,
        required: [true,"preparedBy is required"],
    },
    mobile: {
        type: Number,
        required: [true,"date is required"],
    },
    address: {
        type: String,
        required: [true,"content is required"],
    },
 
})

const prepared=mongoose.model('prepared',preparedSchema);

export default prepared;