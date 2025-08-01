import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/admin.middleware.js"
import { Router } from "express"
import { currentUser } from "../controllers/user.controller.js"



const userRouter = Router()

userRouter.get("/current-user" , verifyJWT , currentUser)

export default userRouter;