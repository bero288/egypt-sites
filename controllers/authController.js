const User = require("../model/user");
const Site = require("../model/site");
const fs = require("fs");
const bcrypt = require("bcrypt");
const register = (req, res) => {
  res.render("./auth/register", { title: "حساب جديد" });
};
const register_post = async(req, res) => {
  const {name, email , password} = req.body;
  let user = await User.findOne({email});
  if(user) {
    return res.redirect("/register" );
  }
  const hashesPass = await bcrypt.hash(password,10);
  user = new User({
    name,
    email,
    password: hashesPass,
  });
  await user.save();
  res.redirect("/login");
};
const login = (req,res)=>{
  res.render("./auth/login" , {title:"تسجيل الدخول"})
}
const login_post = async(req,res)=>{
  const {email , password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    res.redirect("/register");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if(!isMatch){
    res.redirect("/login");
  }
  req.session.userName = user.name;
  req.session.userId = user.id;
  req.session.isAuth = true;
  res.redirect("user/profile");
}
const user_profile = (req,res) =>{
  const userId = req.session.userId;
 Site.find({ userId })
   .sort({ createdAt: -1 })
   .then((result) => {
     userName = req.session.userName;
     res.render("./user/user-profile", {
       title: "الصفحة الشخصية",
       userName,
       sites: result,
     });
   })
   .catch((err) => console.log(err));
}
const logout = (req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      throw err
    }
    res.redirect("/")
  })
}
const site_details = (req, res) => {
  const userId = req.session.useId;
  const id = req.params.id;
  Site.findById(id)
    .then((result) => {
        res.render("./sites/details", { site: result, title: "تفاصيل الموقع" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "غير موجودة " });
    });
};
module.exports = {
  register,
  register_post,
  user_profile,
  login,
  login_post,
  logout,
  site_details,
};
