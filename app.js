const express = require("express");
const ejs = require("ejs");
const uploadRouter = require("./routes/uploadRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
//init the app
const app = express();
app.use(express.json());
//init the port
const port = process.env.PORT || 3000;
//connect to the db
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
//set ejs
app.set("view engine", "ejs");
//public folder
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.render("index", { title: "الرئيسية" });
});
//upload route
app.use(uploadRouter);
