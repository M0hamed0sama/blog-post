import express from 'express';
import { model } from '../model/schema.js';
import { counterModel } from '../model/counters.js';
import * as userFunctions from '../controllers/userFunctions.js';
import {login, register} from '../controllers/register.js'
import {authentication,autherization} from '../middlewares/auth.js'
const userRoutes = express.Router();

userRoutes
    .get('/home', authentication, autherization(2),userFunctions.getArticles)
    .get('/article/:id', authentication,autherization(2), userFunctions.getOneArticle)
    .post('/login', login)
    .post('/register', register)
export {
   userRoutes
}
