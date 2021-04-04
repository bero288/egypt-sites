const passInput = document.querySelector(".form-container #password");
const nameInput = document.querySelector(".form-container #name");
const emailInput = document.querySelector(".form-container #email");
const icon = document.querySelector(".pass-label .icon-eye");
icon.addEventListener("click",()=>{
    if(passInput.type == "password"){
      passInput.type = "text"
      icon.classList = "icon-eye-slash"
    }else{
      passInput.type = "password"
      icon.classList = "icon-eye"
    }
})
/*function validateForm() {
  if (passInput.Value.length<6) {
    swal({
      text:
        "password must nust be more than 6 charactes",
      icon: "warning",
      dangerMode: true,
    });
  }
}*/
