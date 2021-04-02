let card = document.querySelector(".activator");
let ul = document.querySelector(".links-cont");
card.addEventListener("click" , (e)=>{
    card.classList.toggle("clicked");
    if(ul.classList.contains("opened")){
        ul.classList.remove("opened");
        ul.classList.add("closed"); 
    }else{
        ul.classList.remove("closed");
        ul.classList.add("opened"); 
    }
})