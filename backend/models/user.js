
const mongoose=require('mongoose');
const User_schema=new mongoose.Schema({
username:{
    type:String,
    required:true
},


password:{
    type:String,
    required:true

}

});

const User = mongoose.model('user',User_schema);

module.exports=User;