import http from "http"
import express from "express"
import {Server} from "socket.io"
import { Socket } from "dgram";

const app = express()

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})

const userSocketMap = {};//use to store online users
//when the new user is connected from the frontend we send the authUser_id from the frontend and assign it to the userSocketMap

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}
io.on('connection',(socket)=>{
    console.log("user connected",socket.id)
    const userId = socket.handshake.query.userId;
    console.log('userId in socket.js',userId)
    if(userId){
        userSocketMap[userId]=socket.id;
    }
    //now we have to send the online (new connected user) to the frontend and frontend know it bu authUser._id so we will send only keys from userSocketMap
    io.emit('getOnlineUsers',Object.keys(userSocketMap))
    //object.keys return array =>[]

    socket.on("disconnect",()=>{
        console.log('user disconnected',socket.id)
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})



export {io,server,app}
