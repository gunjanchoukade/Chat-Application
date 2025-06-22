import React, { useContext, useEffect, useState } from 'react'
import { Image, PhoneOutgoing, Send, XCircleIcon, XIcon } from 'lucide-react'
import { AppDataContext } from '../../context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'
const FooterInput = () => {
    const [text,setText] = useState('')
    const {backendURL,selectedUser,setMessages,messages,selectedImage,setSelectedImage,subscribeToMessage,unSubscribeToMessage} = useContext(AppDataContext)
    
    const sendMessage = async(e)=>{
        e.preventDefault();
        if(!text.trim() && !selectedImage){
            toast.error("Please type the text or select an image");
            return;
        }
        try {
            const response = await axios.post(`${backendURL}/messages/send/${selectedUser._id}`,{text,image:selectedImage},{withCredentials:true});
            setMessages((prev)=>[...prev,response.data])
            setText('')
            setSelectedImage(null)
           
            
        } catch (error) {
            console.log(error);
        }
    }
    const getMessage = async()=>{
        const response = await axios.get(`${backendURL}/messages/${selectedUser._id}`,{withCredentials:true});
        setMessages(response.data);
    }
    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader()
        reader.onloadend=()=>{
            setSelectedImage(reader.result);
        }
        reader.readAsDataURL(file)
    }
    useEffect(()=>{
        getMessage();
        subscribeToMessage();

        return ()=>unSubscribeToMessage()
    },selectedUser._id)
  return (
    <div className=' w-full'>
        {selectedImage && (
            <div className="mt-2 ml-2 relative">
                <p className="text-xs text-gray-400">Image Preview:</p>
                <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded border"
                />
                <XCircleIcon onClick={()=>setSelectedImage(null)} className='absolute top-2 left-20 bottom-2 bg-black rounded-full'/> 
            </div>
        )}
        <div className='flex items-center  px-2 lg:relative '>
            <input type="text" onChange={(e)=>setText(e.target.value)} value={text} className='w-full bg-gray-800 p-2 rounded-lg border-2 border-gray-400 text-white text-wrap lg:pr-20' placeholder='type your message..'/>
            <label htmlFor="selectMedia" className='mx-2 lg:absolute lg:right-12 lg:bottom-2'>
                <Image />
            </label>
            <input id='selectMedia' onChange={handleImageChange} type="file"  accept='image/*' hidden/>
            <button onClick={sendMessage} className='lg:absolute lg:right-4 lg:bottom-2'><Send/></button>
        </div>
    </div>
  )
}

export default FooterInput
