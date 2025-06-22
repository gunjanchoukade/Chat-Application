import express from "express"
import {login,signUp,logOut,updateProfile,checkUser} from "../controller/auth.controller.js"
import protectRoute from "../middlewares/auth.middleware.js";


const authRouter = express.Router();


authRouter.post('/login',login)
authRouter.post('/signup',signUp)
authRouter.post('/logout',logOut)
authRouter.put('/update-profile',protectRoute,updateProfile)

authRouter.get('/check',protectRoute,checkUser)  // to check whether the user is there afer refreshing the page

export default authRouter;