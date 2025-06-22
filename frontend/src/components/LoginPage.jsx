import {  Lock, Mail, MessageSquare, User } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AppDataContext } from '../../context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const {backendURL,navigate,setToken} = useContext(AppDataContext)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${backendURL}/auth/login`,formData,{withCredentials:true});
            console.log(response)
            if(response.status==200){
                toast.success("Login Successfull");
                localStorage.setItem('token',response.data.token)
                setToken(response.data.token)
                navigate('/')
            }else{
                toast.error("Invalid Credentials")
            }

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex flex-col  lg:justify-center items-center h-screen w-full '>

        <div className='lg:w-[30%] w-[85%] pt-24 lg:pt-0'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center'>
                    <MessageSquare size={108} />
                    <h1 className='text-2xl text-yellow-300 font-semibold'>Login</h1>
                    <p className='text-yellow-100 font-light'>Get started with chat</p>
                </div>
                <div className='p-2 flex flex-col gap-3 justify-center mt-[20px]'>
                    
                    <div className='relative flex items-center w-full gap-2'>
                        <Mail size={29} className='absolute left-[5px] text-gray-200' />
                        <input required
                        type='email'
                        onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        value={formData.email} className='w-full rounded-lg pl-10 p-3 outline-none' placeholder='site@email.com'></input>
                    </div>
                    <div className='relative flex items-center w-full gap-2'>
                        <Lock size={29} className='absolute left-[5px] text-gray-200'/>
                        <input required
                        type='password'
                        value={formData.password}
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        className='w-full rounded-lg pl-10 p-3  outline-none' placeholder='***********'></input>
                    </div>
                    <button className='w-full mt-2 p-2 rounded-lg bg-green-800 text-white text-xl font-semibold'>Login</button>
                    <p className='text-center'>don't have an account? <NavLink className='text-blue-500 underline' to='/signup'>Signup here</NavLink></p>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default LoginPage
