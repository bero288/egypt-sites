const passInput = document.querySelector(".form-container #password");
const icon = document.querySelector(".pass-label .icon-eye");
icon.addEventListener("click",()=>{
    if(passInput.type == "password"){
      passInput.type = "text"
      icon.classList = "icon-eye-slash"
    }else{
      passInput.type = "password"
      icon.classList = "icon-eye"
    }
});