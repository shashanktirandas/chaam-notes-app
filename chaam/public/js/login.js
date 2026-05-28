const register=()=>{
    const auth_submit=document.querySelector('.auth_submit');
    const auth_username=document.querySelector('.auth_username');
    const auth_password=document.querySelector('.auth_password');

    const auth_username_dis=document.querySelector('.auth_username_dis');
    const auth_password_dis=document.querySelector('.auth_password_dis');

    const auth_block_forgot_pwd=document.querySelector('.auth_block_forgot_pwd');
    auth_block_forgot_pwd.style.display="none";
    auth_username_dis.innerText="";
    auth_password_dis.innerText="";
    auth_username.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_password.focus();
                }
            })
            auth_password.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_submit.click();
                }
            })
    auth_submit.addEventListener("click",async ()=>{
        auth_username_dis.innerText="";
        auth_password_dis.innerText="";
        const isEmpty=(str)=>{
            return str.trim();
        }
        if(isEmpty(auth_username.value)===""){
             //alert("enter username!");
             auth_username_dis.innerText="Enter username!"
        }else if(isEmpty(auth_password.value)===""){
            //alert("enter password!");
            auth_password_dis.innerText="Enter password!"
        }else{
           // alert("user is logged in.")
            //console.log(auth_username.value,auth_password.value);
            await fetch("https://chaam-notes-app.onrender.com/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: auth_username.value,
                    password:auth_password.value
                })

            })
            .then((responce)=>responce.json())
            .then((data)=>{
                //console.log(data);
                if(data.success){
                    localStorage.setItem("token",data.data);
                    window.location.href = "../public/home.html"
                }
                else{
                    if(data.field==="username"){
                        //console.log("username : ",data.message);
                        auth_username_dis.innerText=data.message;
                    }
                    if(data.field==="password"){
                        //console.log("password : ",data.message);
                        auth_password_dis.innerText=data.message;
                        setTimeout(()=>{
                            auth_block_forgot_pwd.style.display="flex";
                            auth_block_forgot_pwd.addEventListener("click",async()=>{
                            
                            await fetch("https://chaam-notes-app.onrender.com/api/auth/password-change-otp",{
                                method:"PUT",
                                
                                headers: {
                                    "Content-Type": "application/json"
                                },

                                body: JSON.stringify({
                                    username: auth_username.value
                                })
                            }).then(responce=>responce.json())
                            .then((dataotp)=>{
                                if(dataotp.success){
                                    localStorage.removeItem("userid");
                                    localStorage.setItem("userid_n", dataotp.userid);
                                    console.log(dataotp,dataotp.userid);
                                    window.location.href ="../public/login_otp.html";
                                }
                                
                            })

                            })
                        },300)
                        
                    }
                 }
            })
        }
    })
}
register();