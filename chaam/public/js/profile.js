const exit=()=>{
    const auth_submit=document.querySelector(".auth_submit");
    auth_submit.addEventListener("click",()=>{
        localStorage.setItem("token",null);
        window.location.href = "/index.html"
    })
}
exit();
const profilePage=(data)=>{
    const {username,email,role}=data;
    const auth_username=document.querySelector(".auth_username");
    const auth_email=document.querySelector(".auth_email");
    const auth_role=document.querySelector(".auth_role");
    auth_username.innerText=username;
    auth_email.innerText=email;
    auth_role.innerText=role;
}
let Userdata;
const getUserDetails=async()=>{
    const token=localStorage.getItem("token");
    //console.log(token);
    await fetch("https://chaam-notes-app.onrender.com/api/home/welcome",{
        method:"GET",
        headers:{"Context-Type":"application/json",
            "Authorization": "Bearer "+token
        }
    }).then((resource)=>resource.json())
    .then((data)=>{//console.log(data);
            //console.log(data.success);
        if(data.success){
            profilePage(data);
        }else{
            window.location.href="/index.html"
        }
       
       
    })
}
getUserDetails();