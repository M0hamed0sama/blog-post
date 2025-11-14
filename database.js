import mongoose from "mongoose";
import 'dotenv/config'


const DB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        
        console.log('Database connected successfully');
    }  catch (e) {
        console.log('Database failed to connect',e.message);
        process.exit(1);
    }
}


export {
    DB
}