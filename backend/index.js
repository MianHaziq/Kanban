const express = require('express');
const mongoose = require('mongoose');
const user_router=require('./Routes/user')

const app=express();




app.use(express.json());


mongoose.connect("mongodb://localhost:27017/Kanban")





app.use('/user', user_router);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});



