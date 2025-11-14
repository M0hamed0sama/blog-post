import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {DB} from './database.js';
import { userRoutes } from './routes/user.js';
import { adminRoutes } from './routes/admin.js';

// dotenv.config();

DB();

const app = express()

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/', adminRoutes);
app.use((req, res) => {
    res.status(404).json(
        {
            message: "route doesn't exist" 
        });
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server connected");    
})
