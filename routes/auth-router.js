const express=require('express');
const {
    registerUser,
    loginUser,
    checkRegisterUser,
    checkOTPRegisterUser,
    getUserData,
    passwordChangeOtp,
    checkPasswordChangeOtp,
    changingPassword,
    getRealUserData
}=require("../controllers/auth-controllers");

const router=express.Router();

router.post("/registration",registerUser);
router.post("/login",loginUser);
router.post("/check-registration",checkRegisterUser);
router.post("/check-otp-registration",checkOTPRegisterUser);
router.get("/get-user-data/:id",getUserData);
router.put("/password-change-otp",passwordChangeOtp);
router.post("/check-password-change-otp",checkPasswordChangeOtp);
router.put("/changing-password",changingPassword);
router.get("/get-real-user-data/:id",getRealUserData);


module.exports=router;