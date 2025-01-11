import mongoose from "mongoose";


const projectReportSchema=new mongoose.Schema({
     enterpriseId:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Enterprise',
      required: [true,"enterprise id is required"],
     },
      content:{
        type:String,
        required:[true,"content is required"],
      },
      image:{
        type: String
      },
      typeOfContent:{
        type:String,
        enum:["projectOverview","objective","benefits","futureOutlook","growthandMarket","projectProponent","briefProjectDescription","needOfProject","technicalFeasibilty","strengths","Weaknesses","opportunities","threats"],
        required:[true,"type of content is required"]
      }
})  

const projectRe=mongoose.model("projectreport",projectReportSchema)

export  default projectRe;