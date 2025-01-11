import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { connectDB } from './config/db.js';
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))
app.get('/',(req,res)=>{
    return res.status(400).json({
        status:false,
        message:'Welcome to the API'
    })
})
app.use('/api',routes)
app.listen(process.env.PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${process.env.PORT}`);
})