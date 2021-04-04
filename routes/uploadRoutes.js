const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};
//route to upload
router.get("/create-site",isAuth, uploadController.sites_create);
//handle the upload req
router.post("/sites/upload", uploadController.sites_create_post);
module.exports = router;
