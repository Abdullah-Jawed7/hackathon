import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/admin.middleware.js"
import { Router } from "express"
import { loginUser, registerUser , sendOtp ,verifyOtp } from "../controllers/auth.controller.js"



const authRouter = Router()

authRouter.post("/register" , upload.fields([
    {
        name:"avatar",
        maxCount: 1
    },
]) , registerUser)
authRouter.post("/login" , loginUser)
authRouter.post("/verifyOtp" , verifyOtp)
authRouter.get("/sendOtp/:id" , sendOtp)

export default authRouter