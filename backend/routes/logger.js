const express=require("express")
const router=express.Router();
const{fetchLog}=require('../controller/logger_controller');


router.get('/',fetchLog)



module.exports=router;
