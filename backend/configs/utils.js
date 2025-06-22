import jwt from "jsonwebtoken"

const generateToken = async (userId,res)=> {
    const token = jwt.sign({userId},process.env.JWT_SEC_KEY,{expiresIn:"7d"})
    res.cookie('token',token,{
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly: true,       // cookie can't be accessed via JavaScript
        secure: false,         // cookie sent only on HTTPS
        sameSite: "Lax"
    });
    return token;
}

export default generateToken;