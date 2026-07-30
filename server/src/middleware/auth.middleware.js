import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async(req , _ , next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

    if(!token){
        throw new ApiError(401, "Unauthorized request");
    }

    //jwt.verify() returns payload
   try {
     const decodedToken = await jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET
     );
 
     const user = await User.findById(decodedToken?._id).select(
         "-password -refreshToken"
     );
 
     if(!user){
         throw new ApiError(401,"Invalid Access Token");
     }
 
     req.user = user; //assign extracted paylod to req.user
     next();
   } catch (err) {
        throw new ApiError(401, "Access Token expired or Invalid")
   }

})

export {verifyJWT};