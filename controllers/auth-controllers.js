const User=require('../models/user');
const partialUser=require('../models/partial-user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const sendOTP=require('./sendMail')

const otpGenerator = require("otp-generator");
//register
const registerUser=async(req,res)=>{
   
    try{
        const {username,email,password,role}=req.body;
        // const checkUserExist =await User.findOne({$or : [{username},{email}],});
        // if(checkUserExist){
        //     return res.status(404).json({
        //         success:false,
        //         message:"registartion failed eigther same username or email"
        //     })
        // }
        const checkUsernameExist =await User.findOne({username});
        if(checkUsernameExist){
            return res.status(404).json({
                success:false,
                field:"username",
                message:"username already exist!"
            })
        }
         const checkEmailExist =await User.findOne({email});
        if(checkEmailExist){
            return res.status(404).json({
                success:false,
                field:"email",
                message:"email already exist!"
            })
        }
        const salt= await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        const newUser=await User.create({
        username,
        email,
        password:hashPassword,
        role: role || "user"
        })
        if(newUser){
            res.status(201).json({
                success:true,
                message:"registration done successfully",
                data:newUser
            })
        }
    }catch(err){
        console.log('Error at registration : ',err);
        res.status(500).json({
            success:false,
            message:"something went wrong in registartion"
        })
    }
   
}

//check register
const checkRegisterUser=async(req,res)=>{
   
    try{
        const {username,email,password}=req.body;
        // const checkUserExist =await User.findOne({$or : [{username},{email}],});
        // if(checkUserExist){
        //     return res.status(404).json({
        //         success:false,
        //         message:"registartion failed eigther same username or email"
        //     })
        // }
        const checkUsernameExist =await User.findOne({username});
        if(checkUsernameExist ){

            return res.status(404).json({
                success:false,
                field:"username",
                message:"username already exist!"
            })
        }

         const checkEmailExist =await User.findOne({email});
        if(checkEmailExist){
            return res.status(404).json({
                success:false,
                field:"email",
                message:"email already exist!"
            })
        }
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!valid){
            return res.status(404).json({
                success:false,
                field:"email",
                message:"invalid email!"
            })
        }
        const checkPassword=(password)=>{
            if(password.length < 8){
                return "Password must contain 8 characters";
            }
            if(!/[A-Z]/.test(password)){
                return "Add at least one uppercase letter";
            }
            if(!/[a-z]/.test(password)){
                return "Add at least one lowercase letter";
            }
            if(!/[0-9]/.test(password)){
                return "Add at least one number";
            }
            if(!/[@$!%*?&]/.test(password)){
                return "Add at least one special character";
            }
            return "Strong Password";
        }

        const strong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[@$!%*?&]/.test(password);
        if(!strong){
            return res.status(404).json({
                success:false,
                field:"password",
                message:checkPassword(password)
            })
        }
        const otp = otpGenerator.generate(4,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        // send otp
        await sendOTP(email,otp);

        
            const newUser=await partialUser.create({
                username,
                email,
                password:password,
                role: "user",
                otp:otp,
                createdAt:Date.now()
                })
                if(newUser){

                    res.status(201).json({
                        success:true,
                        message:"registred into database but not verified.",
                        id:newUser._id
                        //data:newUser
                    })
                }

        
    }catch(err){
        console.log('Error at registration : ',err);
        res.status(500).json({
            success:false,
            message:"something went wrong in registartion",
            

        })
    }
   
}

//login

const loginUser=async(req,res)=>{
   
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({
                success:false,
                field:"username",
                message:"username is not found! register for continue"
            })
        }

        const checkpassword=await bcrypt.compare(password,user.password);
        if(!checkpassword){
            return res.status(404).json({
                success:false,
                field:"password",
                message:"invalid password!",
                userid:user._id
            })
        }
        const accessToken=jwt.sign({
            userId:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        },process.env.JWT_SCRETE_KEY,{
            expiresIn:"30m"
        })
        res.status(201).json({
            success:true,
            message:"user logged successfully",
            data:accessToken
        })
       
    }catch(err){
        console.log('Error at login : ',err);
        res.status(500).json({
            success:false,
            message:"something went wrong in login"
        })
    }
   
}

//password change otp send

const passwordChangeOtp=async(req,res)=>{
   
    try{
        const {username}=req.body;
        if(!username){
            return res.status(500).json({
                success:false,
                message:"enter username",
                username:req.body
            })
        }
        const checkUsernameExist =await User.findOne({username});
        const otp = otpGenerator.generate(4,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        // send otp
        await sendOTP(checkUsernameExist.email,otp);
        await User.findByIdAndUpdate(checkUsernameExist._id,{
            otp:otp,
            otpCreatedAt:Date.now()
        })
        res.status(201).json({
            success:true,
            message:"otp is sent",
            userid:checkUsernameExist._id
            //otp:otp
        })

        
    }catch(err){
        console.log('Error at registration : ',err);
        res.status(500).json({
            success:false,
            message:"something went wrong in password change otp",
            

        })
    }
   
}

//check password change otp

const checkPasswordChangeOtp=async(req,res)=>{
   
     try{
        const {_id,enteredOtp}=req.body;
        const userData =await User.findOne({_id});

        console.log("idddd :::",_id);
        if(!userData){
            return res.status(404).json({
                success:false,
                message:"OTP not found or expired"
            })
        }
        const {username,email,password,role,otpCreatedAt,otp}=userData;
        const currentTime=Date.now();
        console.log(currentTime,otpCreatedAt,currentTime - otpCreatedAt)
        if(currentTime - otpCreatedAt > 300000){
            return res.status(404).json({
                success:false,
                message:`otp experied`// ${_id}`
                //,data:userData
            })
        }
        
        if(otp===enteredOtp){
                    res.status(201).json({
                        success:true,
                        message:"otp is verified for pwd change.",
                        userid:_id
                    })
            // res.status(201).json({
            //     success:true,
            //     message:"opt is matched"
            // })
        }else{
            console.log(otp);
            res.status(400).json({
                success:false,
                message:"invalid otp!",
                otp:otp,
                enteredOtp:enteredOtp,
                // username:username
            })
        }

    }catch(err){
        console.log("Error at otp : ",err);
        res.status(500).json({
            success:false,
            message:"somthing went wrong in otp!"
        })
    }
   
}

//password changing to new

const changingPassword=async(req,res)=>{
   
    try{
        const {userid,password}=req.body;
        
        if(!userid){
            return res.status(500).json({
                success:false,
                message:"enter userid",
                username:req.body
            })
        }
        const userData = await User.findById(userid);
            if(!userData){
                return res.status(500).json({
                    success:false,
                    message:"user data retrieving failed!"
                })
            }

const username = userData.username;

        const checkPassword=(password)=>{
            if(password.length < 8){
                return "Password must contain 8 characters";
            }
            if(!/[A-Z]/.test(password)){
                return "Add at least one uppercase letter";
            }
            if(!/[a-z]/.test(password)){
                return "Add at least one lowercase letter";
            }
            if(!/[0-9]/.test(password)){
                return "Add at least one number";
            }
            if(!/[@$!%*?&]/.test(password)){
                return "Add at least one special character";
            }
            return "Strong Password";
        }

        const strong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[@$!%*?&]/.test(password);
        if(!strong){
            return res.status(404).json({
                success:false,
                field:"password",
                message:checkPassword(password)
            })
        }
        const checkUsernameExist =await User.findOne({_id:userid});
        const salt= await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        await User.findByIdAndUpdate(checkUsernameExist._id,{
            password:hashPassword
        })
        res.status(201).json({
            success:true,
            message:"password is changed",
            username:username,
            password:password
        })

        
    }catch(err){
        console.log('Error at registration : ',err);
        res.status(500).json({
            success:false,
            message:"something went wrong in password change otp",
            

        })
    }
   
}

const checkOTPRegisterUser=async(req,res)=>{
    try{
        const {_id,enteredOtp}=req.body;
        const userData =await partialUser.findOne({_id});

        console.log("idddd :::",_id);
        if(!userData){
            return res.status(404).json({
                success:false,
                message:"OTP not found or expired"
            })
        }
        const {username,email,password,role,createdAt,otp}=userData;
        const salt= await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        const userExist=await User.findOne({username});
        if(userExist){
            return res.status(404).json({
                success:false,
                message:"user already exist!"
            })
        }
        
        const currentTime=Date.now();
        console.log(currentTime,createdAt,currentTime - createdAt)
        if(currentTime - createdAt > 300000){
            return res.status(404).json({
                success:false,
                message:`otp experied`// ${_id}`
                //,data:userData
            })
        }
        
        if(otp===enteredOtp){
            const newUser=await User.create({
                username,
                email,
                password:hashPassword,
                role: role,
                otp:otp,
                createdAt:Date.now()
                })
                if(newUser){
                    res.status(201).json({
                        success:true,
                        message:"registred into database verified.",
                        data:newUser
                    })
                }
            // res.status(201).json({
            //     success:true,
            //     message:"opt is matched"
            // })
        }else{
            console.log(otp);
            res.status(400).json({
                success:false,
                message:"invalid otp!"
                //otp:otp,
                //enteredOtp:enteredOtp,
                // username:username
            })
        }

    }catch(err){
        console.log("Error at otp : ",err);
        res.status(500).json({
            success:false,
            message:"somthing went wrong in otp!"
        })
    }
}



const getUserData=async(req,res)=>{
    try{
        const _id=req.params.id;
        console.log(_id);
        const userData =await partialUser.findOne({_id});
        if(userData){
            res.status(201).json({
                success:true,
                message:"retrived data",
                createdAt:userData.createdAt,
                username:userData.username,
                email:userData.email,
                password:userData.password
                //data:userData
            })
        }else{
            res.status(404).json({
                success:false,
                id:_id,
                message:"user data not found!"
            })
        }
    }catch(err){
        console.log("error at get user data : ",err);
        res.status(500).json({
            success:false,
            message:'something went wrong in getuserdata'
        })
    }
}

const getRealUserData=async(req,res)=>{
    try{
        const _id=req.params.id;
        console.log(_id);
        const userData =await User.findOne({_id});
        if(userData){
            res.status(201).json({
                success:true,
                message:"retrived data",
                createdAt:userData.createdAt,
                username:userData.username,
                email:userData.email,
                password:userData.password,
                otpCreatedAt:userData.otpCreatedAt
                //data:userData
            })
        }else{
            res.status(404).json({
                success:false,
                id:_id,
                message:"user data not found!"
            })
        }
    }catch(err){
        console.log("error at get user data : ",err);
        res.status(500).json({
            success:false,
            message:'something went wrong in getuserdata'
        })
    }
}

module.exports={
    registerUser,
    loginUser,
    checkRegisterUser,
    checkOTPRegisterUser,
    getUserData,
    passwordChangeOtp,
    checkPasswordChangeOtp,
    changingPassword,
    getRealUserData
}

