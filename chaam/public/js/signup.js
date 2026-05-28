const register=()=>{
    const auth_submit=document.querySelector('.auth_submit');
    const auth_username=document.querySelector('.auth_username');
    const auth_email=document.querySelector('.auth_email');
    const auth_password=document.querySelector('.auth_password');

    const auth_username_dis=document.querySelector('.auth_username_dis');
    const auth_email_dis=document.querySelector('.auth_email_dis');
    const auth_password_dis=document.querySelector('.auth_password_dis');
    auth_username_dis.innerText="";
    auth_email_dis.innerText="";
    auth_password_dis.innerText="";
    auth_username.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_email.focus();
                }
            })
            auth_email.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_password.focus();
                }
            })
            auth_password.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_submit.click();
                }
            })

    auth_submit.addEventListener("click",async()=>{
        auth_username_dis.innerText="";
        auth_email_dis.innerText="";
        auth_password_dis.innerText="";

        

        const isEmpty=(str)=>{
            return str.trim();
        }

        if(isEmpty(auth_username.value)===""){
             //alert("enter username!");
             auth_username_dis.innerText="Enter username!"
        }else if(isEmpty(auth_email.value)===""){
             //alert("enter email!");
             auth_email_dis.innerText="Enter email!"
        }else if(isEmpty(auth_password.value)===""){
            //alert("enter password!");
            auth_password_dis.innerText="Enter password!"
        }else{
            //alert("user is registered.")
            //console.log(auth_username.value,auth_email.value,auth_password.value);
            await fetch("https://chaam-notes-app.onrender.com/api/auth/check-registration", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: auth_username.value,
                    email:auth_email.value,
                    password:auth_password.value
                })

            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.success){
                    localStorage.removeItem("userid");
                    localStorage.setItem("userid_signup_otp",JSON.stringify({
                        userid:data.id
                    }))

                    // localStorage.removeItem("userdata");
                    //     localStorage.setItem("userdata",JSON.stringify({
                    //     username:auth_username.value,
                    //     email:auth_email.value,
                    //     password:auth_password.value,
                    //     createAt:Date.now()
                    // }))

                    // if(!userdata){
                    //     window.location.href="signup.html";
                    //     return;
                    // }
                     window.location.href = "/signup_otp.html"
                }
                else{
                    if(data.field==="username"){
                        //console.log("username : ",data.message);
                        auth_username_dis.innerText=data.message;
                    }
                    if(data.field==="email"){
                        //console.log("email : ",data.message);
                        auth_email_dis.innerText=data.message;
                    }
                    if(data.field==="password"){
                        //console.log("password : ",data.message);
                        auth_password_dis.innerText=data.message;
                    }
                 }
            });
        }
    })
}
register();