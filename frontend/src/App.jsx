import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import SignUpPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import SettingPage from './components/SettingPage'
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { AppDataContext } from '../context/StoreContext'


const App = () => {
  const navigate = useNavigate()
  
  const {token,setToken,checkAuth,authUser,setAuthUser,onlineUsers} = useContext(AppDataContext)

  

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    }
    
    checkAuth()
    
  },[checkAuth])

  
  
  return (
    <div className='bg-base-100 text-base-content h-screen overflow-hidden'>
      <Navbar></Navbar>
      <div className='border-b'></div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signup' element={!authUser._id ? <SignUpPage/> : <Navigate to='/'/> }></Route>
        <Route path='/login' element={!authUser._id ? <LoginPage/> : <Navigate to='/'/> }></Route>
        <Route path='/settings' element={<SettingPage/>}></Route>
        <Route path='/profile' element={authUser._id ? <ProfilePage/> :<Navigate to='/'/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
