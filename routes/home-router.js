const express=require('express');
const authMiddelware=require('../middleware/auth-middleware')

const router=express.Router();

router.get('/welcome',authMiddelware,(req,res)=>{
    const {userId,username,email,role}=req.accessToken;
    res.status(201).json({
        success:true,
        message:"welcome to home page",
        userId:userId,
        username:username,
        email:email,
        role:role
    })
});

module.exports=router;