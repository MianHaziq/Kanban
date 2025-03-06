const mongoose = require("mongoose");

const LoggerSchema = new mongoose.Schema({
  createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user', 
      required: true
      
  },
  taskid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'task', 
    required: true
},
oldStatus:{
    type:String,
    enum: ["todo", "progress", "done"], 
    required: false
 },

newStatus:{
    type:String,
    enum: ["todo", "progress", "done"] , 
    required: false
},
action:{
    type:String,
    enum: ["create", "update", "delete"] , 
    required: true
},
createdAt:{
type:Date,
default:Date.now(), 
required: true

}

});

module.exports = mongoose.model("Log", LoggerSchema);