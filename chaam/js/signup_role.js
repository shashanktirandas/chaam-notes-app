const register=()=>{
    const auth_submit=document.querySelector('.auth_submit');
    const auth_role=document.querySelector('.auth_role');


    auth_submit.addEventListener("click",async()=>{
            const userdata=localStorage.getItem("userdata");
            if(!userdata){
                window.location.href="../public/signup.html";
                return;
            }
            const {username,email,password}=JSON.parse(userdata);
            alert("user is registered.")
            //console.log(username,email,password,auth_role);
            await fetch("https://chaam-notes-app.onrender.com/api/auth/registration", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    email:email,
                    password:password,
                    role:auth_role.value
                })

            })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                if(data.success){
                     window.location.href = "../public/login.html"
                }
            });
        
    })
}
register();