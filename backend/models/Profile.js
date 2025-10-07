const moongose=require("mongoose");

const profileschema= new moongose.Schema({
  gender:{
    type:String,
  },
  dateofbirth:{
    type:String,
  },
  about:{
    type:String,
    trim:true,
  },
  contactnumber:{
    type:Number,
  },

});

module.exports= moongose.model("Profile",profileschema);