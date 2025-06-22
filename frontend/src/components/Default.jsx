import React from 'react'
import { MessageSquare } from 'lucide-react'

const Default = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col gap-3 justify-center items-center px-2  h-screen w-full'>
            <div className='p-3 bg-yellow-300 text-gray-600 text-semibold rounded-lg'>
                <MessageSquare size={80} />
            </div>
            <h1 className='font-semibold text-xl text-orange-500'>Welcome to Chatput</h1>
            <p className='text-sm text-gray-500'>select a conversation from sidebar to start chatting.</p>
        </div>
    </div>
  )
}

export default Default
