import mongoose, { connect } from "mongoose"


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        if(connect.connection.readyState==1){
            console.log("connected to the database");
        }else{
            console.log('connection failed')
        };
        
        
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;