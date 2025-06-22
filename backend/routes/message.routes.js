import express from "express"
import {getUsersforSidebar,getMessages,sendMessages} from "../controller/messages.controller.js"
import protectRoute from "../middlewares/auth.middleware.js";
const messageRouter = express.Router();

messageRouter.get('/users',protectRoute,getUsersforSidebar)
messageRouter.get('/:id',protectRoute,getMessages)
messageRouter.post('/send/:id',protectRoute,sendMessages)


export default messageRouter