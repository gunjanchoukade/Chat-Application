import cloudinary from "../configs/cloudinary.js";
import { getReceiverSocketId, io } from "../configs/socket.js";
import messageModel from "../model/message.model.js";
import userModel from "../model/user.model.js";

 


const getUsersforSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await userModel.find({_id : { $ne : loggedInUserId}}).select("-password");
        res.status(200).json(allUsers)
    } catch (error) {
        console.log("error in get user sidebar controller",error)
        res.status(500).json(error);
    }
}

const getMessages = async (req,res)=>{
    try {
        const {id:userTochatId} = req.params;
        const myId = req.user._id;

        const messages =await messageModel.find({
            $or:[
                {senderId:myId,receiverId:userTochatId},
                {senderId:userTochatId,receiverId:myId},
            ],
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("error in get messages controller",error)
        res.status(500).json(error);
    }
}

const sendMessages = async (req,res)=>{
    try {
       const {text,image} = req.body;
       console.log(text)
       const {id:receiverId} = req.params
       const senderId = req.user._id;

       let imageUrl;
       if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
       }

       const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image:imageUrl
       })

       await newMessage.save()
       const receiverSocketId = getReceiverSocketId(receiverId);
       if(receiverSocketId){
        io.to(receiverSocketId).emit('newMessage',newMessage)
       }
       res.status(200).json(newMessage)

    } catch (error) {
        console.log("error in get messages controller",error)
        res.status(500).json(error);
    }
}

export {getUsersforSidebar,getMessages,sendMessages};