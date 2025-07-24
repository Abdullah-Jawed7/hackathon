import dotenv from "dotenv"
import connectDB from "../src/db/index.js"
import { app } from "../src/app.js"

dotenv.config({
    path: './.env'
})
const port = process.env.PORT || 8000
connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("Error: " , err);
        throw err
        
    })
    app.listen(port , ()=>{
        console.log("server is running on a port " , port);
        
    })
})
.catch((error)=> { 
    console.log("DB Connection Failed !! ", error)}
)