import React, { useContext, useState } from 'react'
import {Camera, User,Mail} from "lucide-react"
import { AppDataContext } from '../../context/StoreContext'
import axios from 'axios'
import toast from "react-hot-toast"

const ProfilePage = () => {
  const {authUser,backendURL,setAuthUser} = useContext(AppDataContext)
  const [selectImage,setSelectImage] = useState(null)

  const handleUpdate =async (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = async ()=>{
      const base64Image = reader.result;
      setSelectImage(base64Image)
      const response = await axios.put(`${backendURL}/auth/update-profile`,{profilePic:base64Image},{withCredentials:true});
      console.log(response);
      if(response.status==200){
        setAuthUser(response.data);
        toast.success("Profile Updated Successfully");
      }else{
        toast.error("error! pls try again later.")
      }
      
    }
  }
  
  return (
    <div className='flex flex-col justify-center items-center mt-10'>

      <div className=' w-[90%] lg:w-[50%]  gap-6 py-3 rounded-lg'>

        <div className='flex flex-col justify-center items-center gap-2'>
          <h2  className='text-yellow-600 font-semibold text-3xl'>Profile</h2>
          <h4 className='text-md text-yellow-200'>Your profile information</h4>
        </div>

        <div className='flex flex-col justify-center items-center relative gap-3 mt-10'>
            <img src={selectImage || authUser?.profilePic || "/images.jpeg"} className='rounded-full  bg-cover w-40 h-40' />
            <label htmlFor='input' className='absolute bottom-8 rounded-full  right-[110px] lg:right-80 bg-green-700 p-2'>
              <Camera />
            </label>
            <input onChange={handleUpdate} type="file" id='input'  hidden/>
            <p className='font-thin'>click the camera icon to update your photo</p>
        </div>

        <div className='mt-10 px-3'>

          <div className='flex relative'>
            <label className='absolute translate-y-1 pl-2'><User size={32}/></label>
            <input type="text" className='w-full p-2 rounded-lg pl-12 border-2 text-yellow-500 font-semibold'  disabled value={authUser?.fullName}/>
          </div>

          <div className='mt-5'>
            <label className='absolute translate-y-1 pl-2'><Mail size={32}/></label>
            <input type="text" className='w-full p-2 rounded-lg pl-12 border-2 text-yellow-500 font-semibold'  disabled value={authUser?.email}/>
          </div>

        </div>

      </div>


      {/* second */}
      <div className=' w-[90%] lg:w-[50%] py-3 mt-5 px-2 rounded-lg'>
        <h1 className='font-semibold text-xl'>Account Information</h1>

        <div className='flex justify-between mt-5 mb-1'>
          <p className='text-md text-yellow-200'>Member since</p>
          <p className='text-md text-yellow-200'>{new Date(authUser?.createdAt).toDateString()}</p>
        </div>
        <hr />
        <div className='flex justify-between mt-1'>
          <p className='text-md text-yellow-200'>Account status</p>
          <p className='text-md text-yellow-200'>Active</p>
        </div>

      </div>






      
      
    </div>
  )
}

export default ProfilePage
