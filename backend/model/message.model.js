import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps:true}) 
// this timestamps automatically add the createdAt and updatedAt to the database

const messageModel =  mongoose.model('message',messageSchema);
export default messageModel;