const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const taskRouter=require('./routes/task')
const logRouter=require('./routes/logger')
require('dotenv').config();

const app=express();


app.use(cors());

app.use(express.json());


mongoose.connect(process.env.DB_URL)





app.use('/auth', authRouter);
app.use('/log', logRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});



