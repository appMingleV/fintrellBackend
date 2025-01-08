import mongoose from "mongoose";


const enterprise=new mongoose.Schema({
    companyName:{
        type:String,
        required:[true,"companyName is required"],
        unique:true
    },
    promoters:{
        type:[String],
        required:[true,"promoters is required"]
    },
    establishment:{
        type:Date,
        required:[true,"establishment date is required"]
    },
    MSMENumber:{
        type:Number,
        required:[true,"MSMENumber is required"]
    },
    constitution:{
        type:String,
        required:[true,"Constitution is required"],
    },
    categoryEntities:{
        type:String,
        required:[true,"categoryEntities is required"],
    },
    businessDescription:{
        type:String,
        required:[true,"businessDescription is required"],
    },
    address:{
        type:String,
        required:[true,"address is required"],
    },
    city:{
        type:String,
        required:[true,"city is required"],
    },
    landmark:{
        type:String,
        required:[true,"landmark is required"],
    },
    state:{
        type:String,
        required:[true,"state is required"],
    },
    pincode:{
        type:String,
        required:[true,"pincode is required"],
    },
    purposeLoan:{
       type:String,
       required:[true,"purposeLoan is required"], 
    },
    totalProjectCost:{
        type:Number,
        required:[true,"totalProjectCost is required"],
    },
    tenure:{
        type:Number,
        required:[true,"tenure is required"],
    },
    employement:{
       type:Number,
       required:[true,"employment is required"], 
    }
})


const Enterprise=mongoose.model('Enterprise',enterprise);
export default Enterprise;