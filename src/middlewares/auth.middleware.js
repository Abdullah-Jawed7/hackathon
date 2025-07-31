import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers?.["authorization"]?.replace("Bearer ", "") || req.headers?.authorization?.split(" ")[1]
        
        console.log(token);
        console.log(req.headers);
        if (!token) {
             return res.status(401).json(new ApiError(401, "Unauthorized request"))
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -otp  -otpVerified -otpExpiry -isAdmin -isActive")
    
        if (!user) {
            return res.status(401).json(new ApiError(401, "Invalid Access Token"))
        }
    
        req.user = user;
        next()
    } catch (error) {
         return res.status(401).json(new ApiError(401, error?.message || "Invalid access token"))
    }
    
})