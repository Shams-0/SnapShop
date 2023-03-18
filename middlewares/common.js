const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static("public"));
}