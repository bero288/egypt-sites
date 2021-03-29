const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
//route to upload
router.get("/create-site", uploadController.sites_create);
//handle the upload req
router.post("/sites/upload", uploadController.sites_create_post);
module.exports = router;
