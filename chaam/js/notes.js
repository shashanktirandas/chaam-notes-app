const textareas = document.querySelectorAll("textarea");

textareas.forEach((textarea)=>{

    textarea.addEventListener("input", ()=>{

        textarea.style.height = "auto";

        textarea.style.height = textarea.scrollHeight + "px";

    });

});

const fillNotes=()=>{
    const note=localStorage.getItem("note");
    //console.log(note)
    const {userid,noteid,head,date,text}=JSON.parse(note);
    
    const notes_header=document.querySelector('.notes_header');
    const notes_date=document.querySelector('.notes_date');
    const notes_text=document.querySelector('.notes_text');
    notes_header.value=head;
    notes_date.innerText=date;
    notes_text.value=text;

    notes_header.style.height = "auto";
    notes_header.style.height = notes_header.scrollHeight + "px";

    notes_text.style.height = "auto";
    notes_text.style.height = notes_text.scrollHeight + "px";
}
fillNotes();

const getUserDetails=()=>{
    const token=localStorage.getItem("token");
    //console.log(token);
    fetch("https://chaam-notes-app.onrender.com/api/home/welcome",{
        method:"GET",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        }
    }).then((resource)=>resource.json())
    .then((data)=>{//console.log(data);
           
        if(data.success){
             //console.log(data.success);
        }else{
            window.location.href="../public/index.html"
        }
       
       
    })
}
getUserDetails();


const updateNotes=()=>{
    const token=localStorage.getItem("token");
    //console.log(token);
    const back_btn=document.querySelector(".back_btn");
    const notes_header=document.querySelector('.notes_header');
    const notes_date=document.querySelector('.notes_date');
    const notes_text=document.querySelector('.notes_text');
    

    back_btn.addEventListener("click",()=>{
        const head=notes_header.value;
        const date=notes_date.innerText;
        const text=notes_text.value;
        const note=localStorage.getItem("note");
        //console.log(note)
        const {_id,userid}=JSON.parse(note);
         //console.log(userid)
        //console.log(_id);
        if(head==="" && text===""){
        const token=localStorage.getItem("token");
        //console.log(token);
        //console.log("delete",note.head);
        fetch(`https://chaam-notes-app.onrender.com/api/notes/deletenote/${_id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        }
        }).then((resource)=>resource.json())
        .then((data)=>{//console.log(data);
                //console.log(data.success);
            if(data.success){
                //profilePage(data);
                window.location.href="../public/home.html"
            }else{
                window.location.href="../public/index.html"
            }
       
       
    })
    
        }else{
    fetch(`https://chaam-notes-app.onrender.com/api/notes/updatenote/${_id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        },
        body:JSON.stringify({
            head:head,
            date:date,
            text:text
        })
    }).then((resource)=>resource.json())
    .then((data)=>{//console.log(data);
           
        if(data.success){
             //console.log(data.success);
             
             window.location.href="../public/home.html"
        }else{
            window.location.href="../public/index.html"
        }
       
       
    })
}
    })
}
updateNotes();