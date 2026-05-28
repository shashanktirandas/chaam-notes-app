const express=require('express');
const Notes=require('../models/note');
const authMiddelware=require('../middleware/auth-middleware')

const router=express.Router();

router.post("/add",authMiddelware,async (req,res)=>{
    try{
        
        const userId=req.accessToken.userId;
        const username=req.accessToken.username;
        const {head,date,text}=req.body;
        console.log("userid   : ::: ",userId);
        const newNotes=await Notes.create({
                userid:userId,
                head:head,
                date:date,
                text:text
                })
        if(newNotes){
            res.status(201).json({
            success:true,
            message:"creating new notes",
            data:newNotes
        })
    }
    }catch(err){
        console.log(" error at notes : ",err);
    }
   
    
})

router.get("/getusernotes",authMiddelware,async (req,res)=>{
    try{
        const userid=req.accessToken.userId;
        const data= await Notes.find({userid:userid});
        
        if(!data){
            return res.status(404).json({
            success:false,
            a:req.accessToken,
            d:data,
            u:userid,
            message:"userid is not found!"
        })}
        
        res.status(201).json({
            success:true,
            id:userid,
            notesData:data
        })
    }catch(err){
        console.log(" error at notes : ",err);
    }
   
    
})

router.get("/getnote/:id",authMiddelware,async (req,res)=>{
    try{
        const noteid=req.params.id;
        const data= await Notes.findById(noteid);
        console.log(data);
        if(!data){
            return res.status(404).json({
            success:false,
            message:"userid is not found!"
        })}
        
        res.status(201).json({
            success:true,
            id:noteid,
            notesData:data
        })
    }catch(err){
        console.log(" error at notes : ",err);
    }
   
    
})



router.put("/updatenote/:id",authMiddelware,async (req,res)=>{
    try{
        const noteid=req.params.id;
        const updateDate=req.body;
        const data= await Notes.findByIdAndUpdate(noteid,updateDate);
        console.log(data);
        if(!data){
            return res.status(404).json({
            success:false,
            message:"userid is not found!"
        })}
        
        res.status(201).json({
            success:true,
            id:noteid,
            notesData:data
        })
    }catch(err){
        console.log(" error at notes : ",err);
    }
   
    
})

router.delete("/deletenote/:id",authMiddelware,async (req,res)=>{
    try{
        const noteid=req.params.id;
        const updateDate=req.body;
        const data= await Notes.findByIdAndDelete(noteid);
        console.log(data);
        if(!data){
            return res.status(404).json({
            success:false,
            message:"userid is not found!"
        })}
        
        res.status(201).json({
            success:true,
            id:noteid,
            notesData:data
        })
    }catch(err){
        console.log(" error at notes : ",err);
    }
   
    
})
module.exports=router;