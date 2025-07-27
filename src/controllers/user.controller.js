import { ApiResponse } from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

const currentUser =  asyncHandler(async (req, res ) =>{
return res.status(200).json(
    new ApiResponse(200,req?.user , "current user fetched!")
)
})



export {
    currentUser,
}