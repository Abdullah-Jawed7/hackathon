import {memoryUpload , diskUpload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/admin.middleware.js"
import { Router } from "express"
import { loginUser, registerUser , sendOtp ,verifyOtp } from "../controllers/auth.controller.js"



const authRouter = Router()
// change uploadType as per use 
authRouter.post("/register" ,memoryUpload.single("avatar") , registerUser)
authRouter.post("/login" , loginUser)
authRouter.post("/verifyOtp" , verifyOtp)
authRouter.get("/sendOtp/:id" , sendOtp)

export default authRouter