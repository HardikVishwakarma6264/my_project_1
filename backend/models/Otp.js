const moongose=require("mongoose");
const mailsender= require("../utils/mailsender");

const otpschema= new moongose.Schema({

email:{
  type:String,
  required:true,
}  ,
otp:{
  type:String,
  required:true,
},
createdAt:{
  type:Date,   
  default:Date.now(),
  expires:5*60,
},
});

async function sendverificationemail(email,otp){
  try{

    const mailresponse=await mailsender(email,"Verifiaction Email for Login",otp);
    console.log("email send successfully",mailresponse);
  }catch(error){
    console.log("error accured while sending mail",error);
    throw error;
  }
}

// otpschema.pre("save", async function (next) {
//   await sendverificationemail(this.email, this.otp);
//   next(); 
  
// })

module.exports= moongose.model("OTP",otpschema);