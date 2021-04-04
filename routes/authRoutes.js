const router = require("express").Router();
const authConroller = require("../controllers/authController");
const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.redirect("/login")
    }
}
router.get("/register" , authConroller.register);
router.post("/register", authConroller.register_post );
router.get("/login", authConroller.login);
router.post("/login",authConroller.login_post)
router.get("/user/profile", isAuth, authConroller.user_profile);
router.post("/logout", authConroller.logout)
router.get("/sites/:id", authConroller.site_details);
module.exports = router;