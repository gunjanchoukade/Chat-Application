import React, { useContext, useState } from 'react'

import { Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AppDataContext } from '../../context/StoreContext';

const SignUpPage = () => {
    const{navigate,backendURL,setToken} = useContext(AppDataContext)
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:""
    })
    
    const handleSubmit =async  (e)=>{
        e.preventDefault();
        console.log(backendURL)
        try {
            const response = await axios.post(`${backendURL}/auth/signup`,formData,{withCredentials:true});
            if(response.status==200){
                console.log(response)
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
                toast.success(response.data.message);
                navigate('/');
        
            }else{
                toast.error(response.config.message);
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
                    <h1 className='text-2xl text-yellow-300 font-semibold'>Create Account</h1>
                    <p className='text-yellow-100 font-light'>Get started with your free acount</p>
                </div>
                <div className='p-2 flex flex-col gap-3 justify-center mt-[20px]'>
                    <div className='relative flex items-center w-full gap-2'>
                        <User size={29} className='absolute left-[5px] text-gray-200'/>
                        <input required
                        type='text'
                        value={formData.fullName} className='w-full rounded-lg p-3 pl-10 outline-none' 
                        onChange={(e)=>setFormData({...formData,fullName:e.target.value})} 
                        placeholder='Full name'></input>
                    </div>
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
                    <button className='w-full mt-2 p-2 rounded-lg bg-green-800 text-white text-xl font-semibold'>Create account</button>
                    <p className='text-center'>Already have an account? <Link className='text-blue-500 underline' to='/login'>Login</Link></p>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default SignUpPage
