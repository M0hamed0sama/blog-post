import mongoose from 'mongoose';

const counter = new mongoose.Schema({
    seq_name : String,
    seq_value: Number,
})


const counterModel = mongoose.model('Counter', counter);

export {
    counterModel
}