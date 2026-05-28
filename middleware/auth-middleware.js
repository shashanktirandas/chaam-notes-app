const jwt=require("jsonwebtoken")
const authMiddleware=async(req,res,next)=>{
    try{
        const authHeader= req.headers["authorization"];
       console.log(authHeader)
       const token=authHeader && authHeader.split(" ")[1];
       console.log(token);
       if(!token){
        return res.status(404).json({
            success:true,
            message:"access denied. no token provided"
        })
       }
       const user=jwt.verify(token,process.env.JWT_SCRETE_KEY);
       if(!user){
        return res.status(404).json({
            success:false,
            message:"access denied.",
            data:user
        })
       }
       req.accessToken=user;
        next();
    }catch(err){
        console.log("Error at authMiddelware : ",err);
        return res.status(500).json({
            success:false,
            message:"access denied. no token provided.please login to continue or invalid token provided"
        })
    }
}

module.exports=authMiddleware;