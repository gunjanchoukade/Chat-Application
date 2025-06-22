import { AppDataContext } from '../../context/StoreContext'
import ChatContainer from './ChatContainer'
import Default from './Default'
import Sidebar from './Sidebar'
import React, { useContext, useEffect } from 'react'


const HomePage = () => {
    const {selectedUser} = useContext(AppDataContext)
  return (
    <div className='flex lg:justify-center items-center h-screen overflow-hidden'>
      <div className='w-[18%] lg:w-[20%] h-full ml-2'>
        <Sidebar></Sidebar>
      </div>
      <div className='w-[100%] lg:w-[50%] h-full '>
        {selectedUser._id ? <ChatContainer/> : <Default/>}
      </div>
    </div>
  )
}

export default HomePage
