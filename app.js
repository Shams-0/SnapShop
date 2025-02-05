const express = require('express');
const mongoose = require("mongoose");

const app = express();

// Middlewares
require("./middlewares/common")(app);

// Routes
require("./routes")(app);

app.post("/upload", (req, res, next) => {
  res.status(200).json({ message: "EndPoint Hit!" })
})

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

const main = async () => {
  try {
    await mongoose.connect("mongodb+srv://zero:5NUciDdpW81ckXrt@zero.j29pn.mongodb.net/SnapShop?retryWrites=true&w=majority&appName=Zero");
    console.log("Connect to database!");
    app.listen("3000");
    console.log("Server started on Port 3000");
  } catch (error) {
    console.log(error)
  }
}
main();
