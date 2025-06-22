import cloudinary from "../configs/cloudinary.js";
import generateToken from "../configs/utils.js";
import userModel from "../model/user.model.js";
import bcrypt, { hash } from "bcryptjs"

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(500).json({ message: "All fields are required" })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(500).json({ message: "Signup First!!" });
            return;
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(500).json({ message: "Invalid credentials" })
        }
        const token = await generateToken(user._id, res);

        const sendUser = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        }
        
        res.status(200).json({message:'login success',token,sendUser});
    } catch (error) {
        console.log('error in login controller', error);
        res.status(500).json(error);
    }
}
const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            res.status(500).json({ message: "please provide all details." })
            return;
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters long" });
        }
        const found = await userModel.find({ email });

        if (found.length > 1) {
            res.status(500).json({ message: "user already exist." });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullName,
            email,
            password: hashedPass
        })
        const user = await newUser.save();
        const token = await generateToken(user._id, res);
        

        res.status(200).json({ message: "registration successfull", token, user });

    } catch (error) {
        console.log("error in signUp controller", error);
        res.status(500).json(error)
    }
}
const logOut = async (req, res) => {
    try {
        res.clearCookie('token',{ 
            httpOnly: true,
            secure: true,
            sameSite: "None" 
        });
        res.status(200).json({ message: "Logged-out successfully" });
    } catch (error) {
        console.log("error in login controller", error)
        res.status(500).json(error);
    }
}
const updateProfile=async (req,res)=>{
    try {
        const {profilePic}  = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(500).json({ message: "proile pic required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await userModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile controller", error)
        res.status(500).json(error);
    }
}

const checkUser = (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in check user controller", error)
        res.status(500).json(error);
    }
}
export { login, signUp, logOut,updateProfile ,checkUser}