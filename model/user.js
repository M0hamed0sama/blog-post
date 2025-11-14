import mongoose from 'mongoose';


const userScheme = new mongoose.Schema({
    username: {
        type: String,
        require : true
    },
    email: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require : true
    },lastname: {
        type: String,
        require : true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default : 2
    }
}, {
    timestamps : true
}
);


const userModel = mongoose.model('User', userScheme);


export {
    userModel
}