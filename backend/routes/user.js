
const express=require("express")
const router=express.Router();
const{login,Signup}=require('../Controller/auth');
const{createUser,readUser,readUserId,updateUser,deleteUserbyid}=require('../controller/user')

router.post('/login',login)
router.post('/Signup',Signup)

router.post("/create", createUser);
router.get("/read", readUser);
router.get("/read/:id", readUserId);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUserbyid);

module.exports=router;