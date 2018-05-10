// Dependencies
var path = require("path");
var db = require("../models");
const Sequelize = require("sequelize");

// Routes
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/searchPark", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/searchPark.html"));
  });

  app.get("/findPark", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/findPark.html"));
  });

  //Renders a handlebars page with a list of all dogs.
  app.get("/dogs", function(req, res) {
    db.Dog.findAll({}).then(function(data) {
      res.render("dogs", { dogs: data });
    });
  });

  app.get("/dogs/:id", function(req, res) {});
};
