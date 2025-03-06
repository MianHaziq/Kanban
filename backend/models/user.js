
const mongoose=require('mongoose');
const User_schema=new mongoose.Schema({
Username:{
    type:String,
    required:true
},


Password:{
    type:String,
    required:true

}

});

const User = mongoose.model('user',User_schema);

module.exports=User;