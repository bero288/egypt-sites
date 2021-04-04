//import modules
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
require("dotenv").config();
//import routes
const uploadRouter = require("./routes/uploadRoutes");
const authRouter = require("./routes/authRoutes");
//init the app
const app = express();
//init the port
const port = process.env.PORT || 3000;
//connect to the db
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useCreateIndex:true,
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
//save storage to db
const storage = new mongoDbSession({
  uri: process.env.DBURI,
  databaseName: "egypt-sites",
  collection:"sessions"
})
//set ejs
app.set("view engine", "ejs");
//? middlewares
//the  parsers
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, 
    },
    store: storage,
    resave: false,
    saveUninitialized: false,
  })
);
//public folder
app.use(express.static("./public"));
//login/register pages
app.use(authRouter);
//upload route
app.use(uploadRouter);
//main route (Home)
app.get("/", (req, res) => {
  res.render("./sites/index", { title: "الرئيسية" });
});
