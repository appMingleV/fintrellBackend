import mongoose from "mongoose";


const projectReportSchema=new mongoose.Schema({
      content:{
        type:String,
        required:[true,"content is required"],
      },
      image:{
        type: String
      }
})  

const projectRe=mongoose.model("projectreport",projectReportSchema)

export  default projectRe;