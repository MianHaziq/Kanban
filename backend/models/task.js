const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    Title: { 
        type: String, 
        required: true },
    Description: { 
        type: String 

    },
    Status: {   
        type: String,
         required: true,
          enum: ["todo", "progress", "done"] },
Userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
}
        
  
});

module.exports = mongoose.model("Task", taskSchema);