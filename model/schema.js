import mongoose from 'mongoose';

const article = new mongoose.Schema({
    id : Number,
    article : String,
    articleContent : String,
    creationDate : {type : Date , default : Date.now}  
});


const model = mongoose.model('Article', article);

export {
    model
}