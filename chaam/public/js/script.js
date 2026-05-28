const splash=()=>{
  const splash_space=document.querySelector(".splash_space");
  const s_weathes_tag=document.querySelector(".s_weathes_tag");
  splash_space.style.display="flex";
  let loop=true;
  setTimeout(()=>{
    s_weathes_tag.style.marginTop="0vh"
    s_weathes_tag.style.opacity="100%";
  },150);
  
  setInterval(()=>{
    if(loop){
    s_weathes_tag.style.opacity="0%";
    s_weathes_tag.style.marginTop="0.5vh"
    setTimeout(()=>{
      s_weathes_tag.style.marginTop="0vh"
      s_weathes_tag.style.opacity="100%";
      s_weathes_tag.innerText="YOUR NOTES JOURNY."
    },300)
    loop=false;
    }else{
    s_weathes_tag.style.opacity="0%";
    setTimeout(()=>{
      s_weathes_tag.style.opacity="100%";
      s_weathes_tag.innerText="START YOUR WRITING."
    },300)
    loop=true;
    }
  },950)
  setTimeout(()=>{
    splash_space.style.opacity="0%";
  },2000)
  setTimeout(()=>{
    splash_space.style.display="none"
    window.location.href = "../public/signup.html"
  },2100)
}
splash();