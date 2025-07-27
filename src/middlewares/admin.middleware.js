import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const verifyAdmin = asyncHandler(async(req, res, next) => {
    try {
       
        if (!req?.user?.isAdmin) {
             return res.status(401).json(new ApiError(403, "Only Admin Can Access this route"))
         }
        next()
    } catch (error) {
         return res.status(401).json(new ApiError(401, error?.message || "Accessing Admin Route"))
    }
    
})