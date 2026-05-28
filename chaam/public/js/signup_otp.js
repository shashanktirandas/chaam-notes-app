//const { response } = require("express");

console.log("otp page");

const otpVerify = async() => {

    const auth_otp_block = document.querySelector(".auth_otp_block");
    const auth_otp_dis = document.querySelector(".auth_otp_dis");
    const auth_block_otp_time = document.querySelector(".auth_block_otp_time");
    const auth_submit = document.querySelector(".auth_submit");

    auth_otp_dis.style.display = "none";

    const userDataID= localStorage.getItem("userid_signup_otp");

    if(!userDataID){
        window.location.href = "/signup.html";
        return;
    }
    const {userid} = JSON.parse(userDataID);
    console.log(userid);
    const userData=await fetch(`https://chaam-notes-app.onrender.com/api/auth/get-user-data/${userid}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
    })
    // .then((response)=>response.json())
    // .then((data)=>{
    //     console.log(data);
    //     if(data.success){
    //     createAt=data.createAt;
    //    }
    // })
    const userTime = await userData.json();
    console.log(userTime,userTime.createdAt);
    //if(userTime.success){
        const createdAt=userTime.createdAt;
        const username=userTime.username;
        const email=userTime.email;
        const password=userTime.password;
    console.log(userTime,createdAt);
    
    // disable resend initially
    auth_submit.disabled = true;
    auth_submit.style.color = "#999";

    // remaining time
    let time = 30 - Math.floor((Date.now() - createdAt) / 1000);
    console.log(time);
    if(time < 0){
        time = 0;
    }

    // timer
    const timer = setInterval(()=>{

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        if(time > 0){

            auth_block_otp_time.innerText =
            `Resend OTP in ${minutes}:${seconds}`;

            time--;

        }else{

            clearInterval(timer);

            auth_block_otp_time.innerText = "Resend OTP";

            auth_submit.disabled = false;
            auth_submit.style.color = "#000";

        }

    },1000);

    // resend otp
    auth_submit.addEventListener("click",async()=>{

        if(auth_submit.disabled){
            return;
        }

        const response = await fetch(
            "https://chaam-notes-app.onrender.com/api/auth/check-registration",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if(data.success){
            localStorage.removeItem("userid");
                    
            // reload page for fresh timer
          
            window.location.reload();

        }

    });

    // create otp inputs
    for(let i = 0; i < 4; i++){

        const auth_otp_b = document.createElement("input");

        auth_otp_b.type = "text";
        auth_otp_b.inputMode = "numeric";
        auth_otp_b.maxLength = 1;

        auth_otp_b.classList.add("auth_otp_b");

        // typing
        auth_otp_b.addEventListener("input",async()=>{

            // allow only numbers
            if(isNaN(auth_otp_b.value)){
                auth_otp_b.value = "";
                return;
            }

            if(auth_otp_b.value){

                // move next
                if(auth_otp_b.nextElementSibling){
                    auth_otp_b.nextElementSibling.focus();
                }

                // last input
                if(i === 3){

                    const auth_otp_b_list =
                    document.querySelectorAll(".auth_otp_b");

                    let otp = "";

                    for(let j = 0; j < 4; j++){
                        otp += auth_otp_b_list[j].value;
                    }

                    const response = await fetch(
                        "https://chaam-notes-app.onrender.com/api/auth/check-otp-registration",
                        {
                            method:"POST",

                            headers:{
                                "Content-Type":"application/json"
                            },

                            body:JSON.stringify({
                                _id:userid,
                                enteredOtp:otp
                            })
                        }
                    );

                    const data = await response.json();

                    if(data.success){
                        localStorage.removeItem("userid");
                        window.location.href =
                        "/login.html";

                    }else{

                        auth_otp_dis.style.display = "flex";
                        auth_otp_dis.innerText = data.message;
                        console.log("iddd",userid);

                    }

                }

            }

        });

        // backspace previous
        auth_otp_b.addEventListener("keydown",(e)=>{

            if(
                e.key === "Backspace" &&
                auth_otp_b.value === ""
            ){

                if(auth_otp_b.previousElementSibling){
                    auth_otp_b.previousElementSibling.focus();
                }

            }

        });

        auth_otp_block.append(auth_otp_b);

    }

}

otpVerify();