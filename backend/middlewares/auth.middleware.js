import jwt from "jsonwebtoken"
import userModel from "../model/user.model.js"

const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(500).json({message:"token not found"});
        }

        const decode =  jwt.verify(token,process.env.JWT_SEC_KEY);
        if(!decode){
            return res.status(500).json({message:"Unauthorized! , Invalid token"});
        }
        const user = await userModel.findById(decode.userId).select("-password");
        
        if(!user){
            return res.status(500).json({message:"user not found"});
        }
        req.user=user;
        next();
    }catch(error){
        console.log("error in protect-route middleware",error);  
        return res.status(500).json(error);
    }
}
export  default protectRoute;