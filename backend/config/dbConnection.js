import mongoose from "mongoose";

mongoose.set('strictQuery', false); 

const dbConnection = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log(`Database connected successfully`);   
        }
    }catch(error){
        console.log(`Error in connecting to database: ${error}`);   
    }
}

export default dbConnection; 