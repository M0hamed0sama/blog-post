import mongoose from "mongoose";
import 'dotenv/config'


const DB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        
        console.log('Database connected successfully');
    }  catch (err) {
        console.log('Database failed to connect',err.message);
        process.exit(1);
    }
}


export {
    DB
}