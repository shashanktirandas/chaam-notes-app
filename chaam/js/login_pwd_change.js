const register=()=>{
    const auth_submit=document.querySelector('.auth_submit');
    const auth_password=document.querySelector('.auth_password');
    const auth_confirm_password=document.querySelector('.auth_confirm_password');

    const auth_confirm_password_dis=document.querySelector('.auth_confirm_password_dis');
    const auth_password_dis=document.querySelector('.auth_password_dis');
console.log("sdfghjk")
    const userid= localStorage.getItem("useridotp");
    console.log(userid)
    if(!userid){
        window.location.href = "../public/login.html";
        return;
    }
    // const userid = JSON.parse(userDataID);
     console.log(userid);
    auth_confirm_password_dis.innerText="";
    auth_password_dis.innerText="";
    auth_password.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_confirm_password.focus();
                }
            })
            auth_confirm_password.addEventListener("keydown",(e)=>{
                if(e.key=="Enter"){
                    auth_submit.click();
                }
            })
    auth_submit.addEventListener("click",async ()=>{
        auth_confirm_password_dis.innerText="";
        auth_password_dis.innerText="";
        const isEmpty=(str)=>{
            return str.trim();
        }
        if(isEmpty(auth_password.value)===""){
             //alert("enter username!");
            auth_password_dis.innerText="Enter password!"
        }else if(isEmpty(auth_confirm_password.value)===""){
            //alert("enter password!");
            auth_confirm_password_dis.innerText="Enter confirm password!"
        }else if(auth_confirm_password.value!==auth_password.value){
            auth_confirm_password_dis.innerText="Confirm password must be same!"
        }else{
           const response = await fetch(
            "https://chaam-notes-app.onrender.com/api/auth/changing-password",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    userid: userid,
                    password: auth_confirm_password.value
                })
            }
            );

            const data = await response.json();

            console.log(data);

            if(data.success){

                const loginResponse = await fetch(
                    "https://chaam-notes-app.onrender.com/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            username: data.username,
                            password: data.password
                        })
                    }
                );

                const loginData = await loginResponse.json();

                if(loginData.success){

                    localStorage.setItem("token", loginData.data);

                    window.location.href = "../public/home.html";

                }else{

                    if(loginData.field === "password"){
                        auth_password_dis.innerText = loginData.message;
                    }

                    if(loginData.field === "cpassword"){
                        auth_confirm_password_dis.innerText = loginData.message;
                    }
                }
            }
                    
        }
    })
}
register();