
const adminMiddleware=async(req,res,next)=>{
    if(req.accessToken.role !== "admin"){
        return res.status(404).json({
            success:false,
            message:"Access denied. Admin rights required"
        })
    }
    next();
}
module.exports=adminMiddleware;