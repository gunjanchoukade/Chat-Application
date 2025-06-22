import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js"
import dotenv from "dotenv"
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import {io,server,app} from "./configs/socket.js"

dotenv.config()



app.use(cors({
    origin:["http://localhost:5173","https://chat-application-frontend-tan.vercel.app"],
    credentials:true
}))

app.use(express.json({ limit: "10mb" })); // it allows use to exchange json data over apis
app.use(express.urlencoded({ extended: true, limit: "10mb" })); 
app.use(cookieParser())



app.use('/auth',authRouter);
app.use('/messages',messageRouter)

app.get('/',(req,res)=>{
    res.send("Chat-App base API")

})

server.listen(3000,()=>{
    console.log(`Server is running on port=> ${process.env.port}`);
    connectDB();
})