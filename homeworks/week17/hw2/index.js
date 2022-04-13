const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const router = require("./routes/index");
const port = process.env.PORT || 3000;
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`The app is Listening on port ${port}`);
});
