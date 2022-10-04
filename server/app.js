// CREATE A NEW EXPRESS APP (CALLING IT APP.JS BECAUSE IT'S THE EXPRESS SERVER APP I GUESS)
const express = require("express");
const app = express();
const path = require("path");

//LOGGING MIDDLEWARE
const morgan = require("morgan");
app.use(morgan("dev"));

//STATIC MIDDLEWARE
app.use(express.static(path.join(__dirname, "..", "public")));

//BODY PARSING MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CUSTOM ROUTES

// THIS WILL SEND OUR INDEX.HTML FILE EVEN FOR URLS WE DON'T HAVE ROUTES FOR
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//IF ANYTHING GOT THIS FAR THEN WE MADE THE ERROR AND WE CAN HANDLE THAT WITH A 500 ERROR CODE
app.use((err, req, res, next) => {
  console.err(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
