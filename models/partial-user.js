const mongoose=require('mongoose');

const partailUserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{
        type:Number,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("chaam partial users",partailUserSchema);
