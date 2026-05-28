const express=require('express');
const authMiddelware=require('../middleware/auth-middleware')
const adminMiddelware=require('../middleware/admin-middleware')

const router=express.Router();

router.get('/welcome',authMiddelware,adminMiddelware,(req,res)=>{
    const {userId,username,role}=req.accessToken;
    res.status(201).json({
        success:true,
        message:"welcome to admin page",
        userId:userId,
        username:username,
        role:role
    })
});

module.exports=router;