const mongoose = require("mongoose");

const LoggerSchema = new mongoose.Schema({
  createdby:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user', 
      required: true
      
  },
  taskid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'task', 
    required: true
},
oldstatus:{
    type:String,
    enum: ["todo", "progress", "done"], 
    required: false
 },

newstatus:{
    type:String,
    enum: ["todo", "progress", "done"] , 
    required: true
},
action:{
    type:String,
    enum: ["create", "update", "delete"] , 
    required: true
},
createdat:{
type:Date,
default:Date.now(), 
required: true

}

});

module.exports = mongoose.model("Log", LoggerSchema);