import axios from "axios";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {io} from "socket.io-client"

export const AppDataContext = createContext()

const AppProvider = ({children})=>{
    const [token,setToken] = useState('')
    const [selectedUser,setSelectedUser] = useState({})

    const [messages,setMessages] = useState([]);
    const [selectedImage,setSelectedImage] = useState(null)
   
    const [authUser,setAuthUser] = useState({
        createdAt:"",
        email:"",
        fullName:"",
        profilePic:"",
        updatedAt:"",
        _id:""
    })
    const navigate = useNavigate()
    const backendURL = import.meta.env.VITE_backendURL
    const socketConnectedRef = useRef(false)
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    

    const checkAuth = async ()=>{
        try {
            const response = await axios.get(`${backendURL}/auth/check`,{withCredentials:true});
            if(response.status==200){
                setAuthUser({
                    createdAt:response?.data?.createdAt,
                    email:response?.data?.email,
                    fullName:response?.data?.fullName,
                    profilePic:response?.data?.profilePic,
                    updatedAt:response?.data?.updatedAt,
                    _id:response?.data?._id
                });
                if(authUser._id && socketConnectedRef.current==false){
                    connectSocket();
                    socketConnectedRef.current=true;
                }
            }
        } catch (error) {
            console.log(error);
            socketConnectedRef.current=false;
        }
    }

    const connectSocket = ()=>{
        const socket = io(`${backendURL}`,{
            secure:true,
            withCredentials:true,
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        setSocket(socket);
        socket.on('getOnlineUsers',(userIds)=>{
            setOnlineUsers(userIds);
        })
    }
    const disconnectSocket=()=>{
        if(socket){
            socket.disconnect()
            setSocket(null)
            socketConnectedRef.current=false
        }
    }

    const subscribeToMessage = ()=>{
        socket.on('newMessage',(newMessage)=>{
            if(newMessage.senderId != selectedUser._id) return;//this means i am receiving the message from a sender and if i am not in the senders chat dontupdate message
            setMessages((prev)=>[...prev,newMessage])
        })
    }
    const unSubscribeToMessage = ()=>{  //message seen two times so thats why remove the old eventlistener
        socket.off('newMessage')
    }
    const value = {
        token,setToken,
        navigate,backendURL,
        authUser,setAuthUser,
        checkAuth,
        selectedUser,setSelectedUser,
        messages,setMessages,
        selectedImage,setSelectedImage,
        socketConnectedRef,disconnectSocket,
        onlineUsers,
        socket,
        subscribeToMessage,unSubscribeToMessage
    }
   
    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}

export default AppProvider