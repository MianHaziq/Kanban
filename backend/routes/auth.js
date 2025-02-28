const express=require("express")
const router=express.Router();
const{login,Signup}=require('../Controller/auth');


router.post('/login',login)
router.post('/Signup',Signup)


module.exports=router;
