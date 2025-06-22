import React from 'react'
import Header from './Header'
import FooterInput from './FooterInput'
import Content from './Content'

const ChatContainer = () => {
  return (
    <div className='px-2 flex flex-col h-full'>
        <div className='h-[10%]' >
            <Header/>
        </div>
        <div className='flex-1 overflow-y-auto'>
            <Content />
        </div>
        <div className=' w-full h-[10%] mb-2'>
            <FooterInput/>
        </div>
    </div>
  )
}

export default ChatContainer
