const multer = require("multer");
const path = require("path");
const Site = require("../model/site");
//set the storage of multer
const storage = multer.diskStorage({
  destination: "./public/imgs/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
//init the upload var
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImg");
//function to check the file type
function checkFileType(file, cb) {
  //allowed ext
  const filetypes = /jpeg|png|jpg|gif/;
  //check the extentions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check the mime type
  const mimetype = filetypes.test(file.mimetype);
  //check if they are true
  if (mimetype && extname) {
    return cb(null, true);
    console.log("hello");
  } else {
    cb("يمكنك اختيار الصور فقط");
  }
}
//route to create-site
const sites_create = (req, res) => {
  res.render("./sites/upload", { title: "إنشاء موقع" });
};
//upload post req
const sites_create_post = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("./sites/upload", { msg: err, title: "الرئيسية" });
    } else {
      const reqBody = req.body;
      const imgUri = req.file.filename;
      const site = new Site({ ...reqBody, imgUri });
      site.save().then(()=>{
        res.redirect("/")
      }).catch((err)=>{console.log(err)})
    }
  });
};
module.exports = {
  sites_create,
  sites_create_post,
};
