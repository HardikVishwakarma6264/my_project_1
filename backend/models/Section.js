const { default: mongoose } = require("mongoose");
const moongose=require("mongoose");

const section= new moongose.Schema({
  
  sectionname:{
    type:String,
  },
  subsection:[
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"Subsection",
    }
  ],


});

module.exports= moongose.model("Section",section);