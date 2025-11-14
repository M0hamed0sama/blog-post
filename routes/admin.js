import express from 'express';
import * as adminFunctions from '../controllers/adminFunctions.js';
import { authentication, autherization } from '../middlewares/auth.js';

const adminRoutes = express.Router();

adminRoutes
    .get('/admin',authentication,autherization(1), adminFunctions.getArticles)
    .get('/edit/:id', authentication,autherization(1),adminFunctions.getArticles)
    .post('/new',authentication,autherization(1),adminFunctions.addManyArticles )


export {
   adminRoutes
}


/**/
