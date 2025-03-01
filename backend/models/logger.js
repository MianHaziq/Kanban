const mongoose = require("mongoose");

const LoggerSchema = new mongoose.Schema({
  createdby:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
      
  },
  taskid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'task'
},
oldstatus:{
    type:String,
    enum: ["todo", "progress", "done"]
 },

newstatus:{
    type:String,
    enum: ["todo", "progress", "done"] 
},
action:{
    type:String,
    enum: ["create", "update", "delete"] 
},
time:{
type:Date,
default:Date.now()

}

});

module.exports = mongoose.model("Log", LoggerSchema);