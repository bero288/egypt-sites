const User = require("../model/user");
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
  req.session.isAuth = true;
  res.redirect("user/profile");
}
const user_profile = (req,res) =>{
  res.render("./user/user-profile" , {title:"الصفحة الشخصية"});
}
const logout = (req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      throw err
    }
    res.redirect("/")
  })
}
module.exports = {
  register,
  register_post,
  user_profile,
  login,
  login_post,
  logout,
};
