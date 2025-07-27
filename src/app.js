import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express();

app.use(cors({credentials:true}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// importing routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

// initializing routes
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)

export {app}