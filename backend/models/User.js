const moongose=require("mongoose");

const userschema= new moongose.Schema({
  firstname:{
    type:String,
    required:true,
    trim:true,
  },
  lastname:{
    type:String,
    required:true,
    trim:true,
  },
    email:{
    type:String,
    required:true,
    trim:true,
  },
  password:{
    type:String,
    require:true,
  },
  accounttype:{
    type:String,
    enum:["Admin","Student","Instructor"],
  },
  additionaldetail:{
    type:moongose.Schema.Types.ObjectId,//dusre schema ke id ayege
    required:true,
    ref:"Profile",//dusre schema se
  },
  courses:[  // array isliye banaye kyoke course bohot sare ho sakte h
    {
       type:moongose.Schema.Types.ObjectId,
       ref:"Course",
    }
  ],
  image:{
    type:String,
    required:true,
  },
  token:{
    type:String,
  },
  resetpasswordexpire:{
    type:Date,
  },
  courseprogress:[{
     type:moongose.Schema.Types.ObjectId,
       ref:"Courseprogress",
  }],
})

module.exports= moongose.model("User",userschema);