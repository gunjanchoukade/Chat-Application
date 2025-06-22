import React, { useContext } from 'react'
import { AppDataContext } from '../../context/StoreContext'
import { useEffect } from 'react'
import { useRef } from 'react'

const Content = () => {
    const {messages,setMessages,authUser,socket} = useContext(AppDataContext)
    const scrollRef = useRef(null)
    const formatTime = (timestamp)=>{
      return new Date(timestamp).toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit',
          hour12:false
      })
        
    }
    useEffect(()=>{
      if(messages && scrollRef.current){
        scrollRef.current.scrollIntoView({behavior:"smooth"})
      }
    },[messages])
  return (
    <div className="flex flex-col  p-4 ">
      {/* Messages List */}
        <div className="flex-1  overflow-y-auto space-y-2">
            {messages.map((msg) => (
            <div
                ref={scrollRef}
                key={msg._createdAt}
                className={`max-w-[80%] break-words w-fit px-4 py-2 rounded-lg ${
                msg.senderId === authUser._id
                    ? 'bg-blue-500 text-white self-end ml-auto'
                    : 'bg-gray-700 text-white self-start mr-auto'
                }`}
            >
                {msg.text && <p>{msg.text}</p>}
                {msg.image && (
                <img src={msg.image} alt="img" className="mt-2 rounded max-w-[200px] object-cover" />
                )}
                <p className='text-[10px] text-right text-gray-200'>{formatTime(msg.createdAt)}</p>
            </div>
            ))}
       </div>
    </div>
  )
}

export default Content
