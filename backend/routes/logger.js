const express=require("express")
const router=express.Router();
const{fetchLog}=require('../controller/loggerController');


router.get('/',fetchLog)



module.exports=router;
