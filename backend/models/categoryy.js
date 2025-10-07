const { default: mongoose } = require("mongoose");
const moongose=require("mongoose");

const Category= new moongose.Schema({
  
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
  },
  course:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
    }
  ]
  


});

module.exports= moongose.model("Category",Category);