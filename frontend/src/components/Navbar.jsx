import React, { useContext } from 'react'
import { MessageSquare,SettingsIcon,User,LogOutIcon } from 'lucide-react'
import { AppDataContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const Navbar = () => {
  const {authUser,backendURL,setAuthUser,setToken,navigate,disconnectSocket,setSelectedUser} = useContext(AppDataContext)

  const HandleLogOut =async ()=>{
    try {
      const response = await axios.post(`${backendURL}/auth/logout`,{},{withCredentials:true});
      if(response.status==200){
        setAuthUser({
          createdAt:"",
          email:"",
          fullName:"",
          profilePic:"",
          updatedAt:"",
          _id:""
        });
        setToken('')
        localStorage.removeItem('token');
        toast.success('Logged out!')
        disconnectSocket()
        navigate('/login')
      }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='px-[5px] lg:px-[50px] py-2 flex justify-between items-center'>
      {/* left side */}
      <div className='flex gap-1 items-center text-yellow-400 cursor-pointer' onClick={()=>{setSelectedUser({}),navigate('/')}}>
          <MessageSquare size={30}/>
          <h2 className='font-semibold lg:text-xl text-xl text-white '>Chatput</h2>
      </div>


      {/* right side */}
      <div className='flex lg:gap-7 gap-2 text-sm lg:text-xl text-yellow-200 items-center'>
        <div>
          <Link className={authUser._id ? 'flex items-center cursor-pointer bg-gray-900 px-2 py-1 rounded-lg gap-1' : ' hidden'} to='/profile'>
            <User/>
            <h2 className='hidden lg:block lg:text-sm'>Profile</h2>
          </Link>
        </div>
        <div>
          <Link className={authUser._id ? 'flex items-center cursor-pointer bg-gray-900 py-1 px-2 rounded-lg gap-1' : ' hidden'}
            onClick={HandleLogOut}>
            <LogOutIcon/>
            <h2 className='hidden lg:block lg:text-sm'>Logout</h2>
          </Link>
        </div>
        <div className=''>
          <Link className='flex items-center cursor-pointer  bg-gray-900 py-1 px-2 rounded-lg gap-1'  to='/settings'>
            <SettingsIcon />
            <h2 className='hidden lg:block lg:text-sm'>Settings</h2>
          </Link>
        </div>
      
      </div>
    </div>
  )
}

export default Navbar
