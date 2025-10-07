const moongose=require("mongoose");

const subsection= new moongose.Schema({
  
  title:{
    type:String,
  },
  timeduration:{
    type:String,
  },
  description:{
    type:String,
  },
  videourl:{
    type:String,
  },


});

module.exports= moongose.model("Subsection",subsection);