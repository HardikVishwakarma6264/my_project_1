const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth middleware
// exports.auth = async (req, res, next) => {
//   try {
//     // 1. Extract token (cookie, body, or header)
//     const token =
//       req.cookies.token ||
//       req.body.token ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     // 2. Agar token nahi mila
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token missing",
//       });
//     }

//     // 3. Verify token
//     try {
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decode);

//       // token ka data (id, email, role, etc) request me daal dete hain
//       req.user = decode;
//     } catch (err) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Token",
//       });
//     }

//     // 4. Next middleware ya controller ko call karo
//     next();

//   } catch (error) {
//     console.error("Auth error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while verifying token",
//     });
//   }
// };
exports.auth = async (req, res, next) => {
  try {
    // Extract token from cookie, body, or header
    let token = req.cookies?.token || req.body?.token || req.headers?.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // If token from header, remove Bearer prefix
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

exports.isstudent=async(req,res,next)=>{
  try{
    if(req.user.accounttype !="Student"){
      return res.status(401).json({
        success:false,
        message:"this is protecte route for student",
      });
    }
    next();

  }catch(error){
     return res.status(500).json({
      success: false,
      message: "user role cannot verified, try again !",
    });
  }
}

exports.isadmin=async(req,res,next)=>{
  try{
    if(req.user.accounttype !="Admin"){
      return res.status(401).json({
        success:false,
        message:"this is protecte route for admin",
      });
    }
    next();

  }catch(error){
     return res.status(500).json({
      success: false,
      message: "user role cannot verified, try again !",
    });
  }
}

exports.isinstructor=async(req,res,next)=>{
  try{
    if(req.user.accounttype !="Instructor"){
      return res.status(401).json({
        success:false,
        message:"this is protecte route for admin",
      });
    }
    next();

  }catch(error){
     return res.status(500).json({
      success: false,
      message: "user role cannot verified, try again !",
    });
  }
}
