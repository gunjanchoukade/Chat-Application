import React, { useContext } from 'react'
import { AppDataContext } from '../../context/StoreContext'
import { Cross,XIcon } from 'lucide-react'
const Header = () => {
    const {selectedUser,setSelectedUser,onlineUsers} = useContext(AppDataContext)
  return (
    <div className='w-full  flex justify-between items-center px-2 border-b'>
        <div className={`flex items-center py-2 gap-2 mt-3 `}>
            <img src={selectedUser.profilePic || "/images.jpeg"} className="w-8 h-8 rounded-full ml-1" />
            <div>
                <p className=' text-xs lg:text-lg capitalize font-bold'>{selectedUser.fullName || "random"}</p>
                <p className='textarea-xs text-green-400'>{`${onlineUsers.includes(selectedUser._id) ? 'Active' : 'Inactive'}`}</p>
            </div>
        </div>
        <div className='bg-gray-600  cursor-pointer rounded-full text-yellow-300 ' onClick={()=>setSelectedUser({})}>
            <XIcon/>
        </div>

    </div>
  )
}

export default Header
