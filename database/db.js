const mongoose=require('mongoose');
const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully");
        
    }catch(err){
        console.log("Error at DB : ",err);
    }
}

module.exports=connectToDB;