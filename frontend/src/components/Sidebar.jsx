import React, { useContext, useEffect, useState } from 'react'
import { AppDataContext } from '../../context/StoreContext'
import axios from 'axios'
import Default from './Default';
import ChatContainer from './ChatContainer';
import { User } from 'lucide-react';

const Sidebar = () => {
    const selectedId='';
    const [users,setUsers] = useState([]);
    const {backendURL,selectedUser,setSelectedUser,onlineUsers} = useContext(AppDataContext)
    const getUsers=async ()=>{
        const response = await axios.get(`${backendURL}/messages/users`,{withCredentials:true})
        setUsers(response.data)
    }
    useEffect(()=>{
        
        getUsers();
    },[])
  return (
    
    <div className=' h-screen border-r flex flex-col'>
        <div className='flex gap-1 items-center sticky top-0 z-50'>
            <User className='hidden lg:block'/>
            <h1 className='lg:text-2xl text-xs'>Contacts</h1>
        </div>
        <div className='h-screen overflow-y-auto flex-1'>
            {users.map((u,index)=>{
                return(
                    <div onClick={(e)=>setSelectedUser(u)} key={index} className={`relative flex items-center py-2 gap-2 mt-3 ${selectedUser._id == u._id ? 'bg-gray-700':''}`}>
                        <img src={u.profilePic || "/images.jpeg"} className=" w-8 h-8 rounded-full ml-1" />
                        <div className='lg:block hidden'>
                            <p className=' text-xs lg:text-lg capitalize font-bold'>{u.fullName || "random"}</p>
                            <p className={`text-xs ${onlineUsers.includes(u._id)?'text-green-500':'text-white'}`}>{`${onlineUsers.includes(u._id)? 'Online':'Offline'} `}</p>
                        </div>
                        <p className={`lg:hidden ${onlineUsers.includes(u._id)?'absolute bottom-1 right-5 w-2 h-2 rounded-full p-2 bg-green-600 ':'hidden'}`}></p>
                    </div>
                )
            })}
        </div>
    </div>
    
  )
}

export default Sidebar
