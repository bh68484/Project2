var path = require("path");

module.exports = function(app) {
  //Getting the park data used by Google Maps App
  app.get("/api/parks", function(req, res) {});
  //Getting all dogs
  app.get("/api/dogs", function(req, res) {});
};
