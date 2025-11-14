import mongoose from 'mongoose';

const article = new mongoose.Schema({
    id : {type : Number},
    title : {type : String , trim : true},
    content : {type : String , trim : true},
    category : {type : String, trim : true},
    tags : {type :   Array},
    creationDate : {type : Date , default : Date.now}  
});


const model = mongoose.model('Article', article);

export {
    model
}