const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },
    description: { 
        type: String 

    },
    status: {   
        type: String,
         required: true,
          enum: ["todo", "progress", "done"] },
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
}
        
  
});

module.exports = mongoose.model("task", taskSchema);