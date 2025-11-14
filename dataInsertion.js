import mongoose from 'mongoose';
import {model} from './model/schema.js';
import fs from 'node:fs';
import 'dotenv/config';

let temp = fs.readFileSync('./data.json' , 'utf-8');

temp = JSON.parse(temp)

const data = temp.articles;

console.log(data);

await mongoose.connect(process.env.MONGO_URI)
.then((m)=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log(err.message);
    process.exit(1);
});


await model.insertMany(data)
.then((Data)=>{
    console.log('data inserted');
    
}).catch((err)=>{
    console.log(err.message);
});


process.exit(1);




