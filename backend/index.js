const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const user_router=require('./Routes/user')
const auth_router=require('./routes/auth')
const task_router=require('./routes/task')
const log_router=require('./routes/logger')
require('dotenv').config();

const app=express();


app.use(cors());

app.use(express.json());


mongoose.connect(process.env.DB_URL)





app.use('/auth', auth_router);
app.use('/log', log_router);
app.use('/user', user_router);
app.use('/task', task_router);


app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});



