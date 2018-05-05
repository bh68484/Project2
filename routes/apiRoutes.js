var path = require("path");

var db = require("../models");

module.exports = function(app) {
  //Getting the park data used by Google Maps App
  app.get("/api/parks", function(req, res) {});
  //Getting all dogs
  app.get("/api/dogs", function(req, res) {});

  app.post("/api/parkSearch", function(req, res) {
  	console.log('called');
  	console.log(req.body.data);

  	db.Parks.findOne({
      where: {
        dogPark: 'yes'
      },
    }).then(function(dbParks) {
      res.json(dbParks);
      console.log(dbParks.dataValues);
    });

  })
};
