const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const user_router=require('./Routes/user')
const auth_router=require('./routes/auth')
const task_router=require('./routes/task')



const app=express();


app.use(cors());

app.use(express.json());


mongoose.connect("mongodb://localhost:27017/Kanban")





app.use('/auth', auth_router);
app.use('/user', user_router);
app.use('/task', task_router);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});



