const mongoose=require('mongoose');

const notesSchema=new mongoose.Schema({
    userid:{
        type:String,
        require:true,
        trim:true
    },
    head:{
        type:String,
        require:true,
        trim:true
    },
    date:{
        type:String,
        require:true
    },
    text:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("notes",notesSchema);
