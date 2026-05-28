
const profilePage=(data)=>{
    const {username,email,role}=data;
    // const header=document.querySelector(".header");
    // header.innerText=username;
    //console.log(username,email,role);
}
const getUserDetails=()=>{
    const token=localStorage.getItem("token");
    //.log(token);
    fetch("http://localhost:3000/api/home/welcome",{
        method:"GET",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        }
    }).then((resource)=>resource.json())
    .then((data)=>{//console.log(data);
            //console.log(data.success);
        if(data.success){
            profilePage(data);
        }else{
            window.location.href="../public/index.html"
        }
       
       
    })
}
getUserDetails();

let noteData=[
    {
        userid:"123",
        noteid:"321",
        head:"how to make cake",
        date:"May 12,2026",
        text:"to make make cake"
    },
     {
        userid:"123",
        noteid:"321",
        head:"how to make cake",
        date:"May 18,2026",
        text:"to make make cake"
    }, 
    {
        userid:"123",
        noteid:"321",
        head:"how to make cake",
        date:"May 12,2026",
        text:"to make make cake"
    },
]


const notes=()=>{
    const notes=document.querySelector(".notes");
    noteData.forEach((note)=>{
    const notes_block=document.createElement("div");

    const notes_option_space=document.createElement("div");
    notes_option_space.classList.add("notes_option_space");
    
    const notes_option=document.createElement("div");
    notes_option.classList.add("notes_option");
    notes_option.innerHTML=`<i class="fa-solid fa-ellipsis"></i>`
    notes_option_space.append(notes_option);
    
    const notes_option_box=document.createElement("div");
    notes_option_box.classList.add("notes_option_box");

    const notes_option_delete=document.createElement("div");
    notes_option_delete.classList.add("notes_option_block");
    notes_option_delete.classList.add("notes_option_delete");

    const notes_option_delete_text=document.createElement("div");
    notes_option_delete_text.classList.add("notes_option_block_text");
    notes_option_delete_text.classList.add("notes_option_delete_text");
    notes_option_delete_text.innerText="Delete";
    notes_option_delete.append(notes_option_delete_text);

    const notes_option_delete_logo=document.createElement("div");
    notes_option_delete_logo.classList.add("notes_option_block_logo");
    notes_option_delete_logo.classList.add("notes_option_delete_logo");
    notes_option_delete_logo.innerHTML=`<i class="fa-solid fa-circle-minus"></i>`;
    notes_option_delete.append(notes_option_delete_logo);
    
    notes_option_delete.addEventListener("click",()=>{
        const token=localStorage.getItem("token");
        //console.log(token);
        //console.log("delete",note.head);
        fetch(`http://localhost:3000/api/notes/deletenote/${note._id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        }
        }).then((resource)=>resource.json())
        .then((data)=>{//console.log(data);
                //console.log(data.success);
            if(data.success){
                profilePage(data);
                window.location.href="../public/home.html"
            }else{
                window.location.href="../public/index.html"
            }
       
       
    })
    })

    notes_option_box.append(notes_option_delete);

    const notes_option_duplicate=document.createElement("div");
    notes_option_duplicate.classList.add("notes_option_block");
    notes_option_duplicate.classList.add("notes_option_duplicate");

    const notes_option_duplicate_text=document.createElement("div");
    notes_option_duplicate_text.classList.add("notes_option_block_text");
    notes_option_duplicate_text.classList.add("notes_option_delete_text");
    notes_option_duplicate_text.innerText="Duplicate";
    notes_option_duplicate.append(notes_option_duplicate_text);

    const notes_option_duplicate_logo=document.createElement("div");
    notes_option_duplicate_logo.classList.add("notes_option_block_logo");
    notes_option_duplicate_logo.classList.add("notes_option_duplicate_logo");
    notes_option_duplicate_logo.innerHTML=`<i class="fa-solid fa-clone"></i>`;
    notes_option_duplicate.append(notes_option_duplicate_logo);
    
    notes_option_duplicate.addEventListener("click",()=>{
        const date = new Date();
        const formatted =
        `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        const token=localStorage.getItem("token");
        fetch("http://localhost:3000/api/notes/add",{
        method:"POST",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        },
        body:JSON.stringify({
            head:note.head,
            date:formatted,
            text:note.text
       })
    }).then((resource)=>resource.json())
    .then((data)=>{
        if(data.success){
           console.log(data);
           window.location.href="../public/home.html"
        }else{
            window.location.href="../public/index.html"
        }
       
     })

    })

    notes_option_box.append(notes_option_duplicate);


    let option_open=true;
    notes_option.addEventListener("click",()=>{
        const notes_option_box_all=document.querySelectorAll(".notes_option_box");
        notes_option_box_all.forEach((notes_o_b)=>{
            notes_o_b.style.display="none";
        })
        if(option_open){
            notes_option_box.style.display="flex";
            option_open=false;
        }
        else{
            notes_option_box.style.display="none";
            option_open=true;
        }
    })

    notes_option_space.append(notes_option_box);

    notes_block.append(notes_option_space);

    const notes_block_main=document.createElement("div");
    notes_block_main.classList.add("notes_block_main"); 

    const notes_block_header=document.createElement("div");
    notes_block_header.classList.add("notes_block_header");
    const head = note.head?.replace(/\n/g, " ").trim() || "";

    notes_block_header.innerText=head.length > 30
    ? head.slice(0, 30) + "..."
    : head;
    notes_block_main.append(notes_block_header);

    const notes_block_date=document.createElement("div");
    notes_block_date.classList.add("notes_block_date");
    notes_block_date.innerText=note.date;
    notes_block_main.append(notes_block_date);

     notes_block_main.addEventListener("click",()=>{
        localStorage.setItem("note",JSON.stringify(note));
        //console.log("notesssss :::: ",note);
        window.location.href="../public/notes.html";
    })

    notes_block.append(notes_block_main);

    notes_block.classList.add("notes_block");
    //console.log(note)
    notes.append(notes_block);
    

    })
     localStorage.removeItem("note");

}

const getNotes=()=>{
    const token=localStorage.getItem("token");
    //console.log(token);
     const date = new Date();
     const formatted =
    `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
     //console.log(formatted);
    fetch("http://localhost:3000/api/notes/getusernotes",{
        method:"GET",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        }
    }).then((resource)=>resource.json())
    .then((data)=>{//console.log(data);
            //console.log(data.success);
        if(data.success){
            noteData=data.notesData;
            if(!noteData.length){
                //console.log(noteData);
                const token=localStorage.getItem("token");
                //console.log("clicled")
                fetch("http://localhost:3000/api/notes/add",{
                method:"POST",
                headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer "+token
                },
                body:JSON.stringify({
                    head:"Start your notes journey",
                    date:formatted,
                    text:""
            })
                }).then((resource)=>resource.json())
                .then((data)=>{//console.log(data);
                        //console.log(data.success);
                    if(data.success){
                    //console.log(data);
                    localStorage.removeItem("note");
                    const note={
                            _id:data.data._id,
                            userid:data.data.userid,
                            head:data.data.head,
                            date:data.data.date,
                            text:data.data.text
                        }
                        localStorage.setItem("note",JSON.stringify(note));
                        //console.log(note);
                    window.location.href="../public/home.html"
                    }else{
                        window.location.href="../public/index.html"
                    }
                
                
                })
            }
            notes();
        }else{
            window.location.href="../public/index.html"
        }
       
       
    })
}

getNotes();

const notesAdd=()=>{
   
     const notes_add_btn=document.querySelector(".notes_add_btn");
     const date = new Date();
     const formatted =
    `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
     //console.log(formatted);
     notes_add_btn.addEventListener("click",()=>{
         const token=localStorage.getItem("token");
        //console.log("clicled")
        fetch("http://localhost:3000/api/notes/add",{
        method:"POST",
        headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+token
        },
        body:JSON.stringify({
            head:"",
            date:formatted,
            text:""
       })
    }).then((resource)=>resource.json())
    .then((data)=>{//console.log(data);
            //console.log(data.success);
        if(data.success){
           // profilePage(data);
           //localStorage.setItem("notesdata",data);
        //    const noteData={
        //     userid:data.data.userid,
        //     noteid:data.data._id,
        //     head:data.data.head,
        //     date:data.data.date,
        //     text:data.data.text,
        //    }
           console.log(data);
          // localStorage.setItem("note",JSON.stringify(noteData));
          localStorage.removeItem("note");
           const note={
                _id:data.data._id,
                userid:data.data.userid,
                head:data.data.head,
                date:data.data.date,
                text:data.data.text
             }
             localStorage.setItem("note",JSON.stringify(note));
             //console.log(note);
           window.location.href="../public/notes.html"
        }else{
            window.location.href="../public/index.html"
        }
       
       
    })
     })
}
notesAdd();