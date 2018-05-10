var path = require("path");

var db = require("../models");

const Sequelize = require("sequelize");

const fileUpload = require("express-fileupload");

const Op = Sequelize.Op;

var googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDimcyIaL5TsDxagrIOyFRuDTlfQg3J0uU"
});

// var reverseGeocode = require('latlng-to-zip');
var distance = require("google-distance");
var KilometersToMiles = require("kilometers-to-miles");

module.exports = function(app) {
  //Getting the park data used by Google Maps App
  app.get("/api/parks", function(req, res) {
    db.Parks.findAll({}).then(function(dbParks) {
      res.json(dbParks);
    });
  });

  app.get("/api/parks/locationsearch", function(req, res) {
    googleMapsClient.distanceMatrix(
      {
        origins: [
          "1600 Amphitheatre Parkway, Mountain View, CA",
          "15 E. Peace St. Raleigh, NC"
        ],
        destinations: ["Cary, NC"],
        mode: "driving"
      },
      function(err, response) {
        if (!err) {
          console.log(err);
          res.json(response);
          console.log("No Error in Distance Search");
        } else {
          console.log(err);
        }
      }
    );
  });

  //Getting all dogs
  app.get("/api/dogs", function(req, res) {
    db.Dog.findAll({}).then(function(dbDogs) {
      res.json(dbDogs);
    });
  });

  app.get("/api/dogs/:id", function(req, res) {
    db.Dog.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  app.post("/api/parkSearch", function(req, res) {
    // console.log("called");
    // console.log(req.body.distanceObj);

    var searchArr = req.body.data;
    console.log(searchArr);
    // var distanceArr = [];
    var obj = {};

    if (searchArr !== undefined) {
      searchArr.forEach(function(data) {
        obj[data[0]] = data[1];
      });

      db.Parks.findAll({
        where: {
          [Op.or]: [obj]
        }
      }).then(function(dbParks) {
        var zipCode = req.body.distanceObj.zipCode;
        // var parks = generateParks(zipCode, dbParks);
        //  console.log(parks);
        var distanceArr = [];

        if (zipCode != "") {
          for (var i = 0; i < dbParks.length; i++) {
            var ktm = new KilometersToMiles();

            if (dbParks[i].address !== "") {
              distance.get(
                {
                  origin: zipCode,
                  destination: dbParks[i].address
                },
                function(err, data) {
                  if (err) return console.log(err);
                  distanceArr.push(ktm.get(parseInt(data.distance)));
                }
              );
            }
          }

          var parks = addDistance(distanceArr, dbParks);
          res.json(parks);
        } else {
          res.json(dbParks);
        }

        // console.log('distanceObj: ' + req.body.distanceObj.miles);
        // res.json(parks);
        // if (true) {
      });
    } else {
      db.Parks.findAll({
        // where: {
        //   [Op.or]: [obj]
        // }
      }).then(function(dbParks) {
        var zipCode = req.body.distanceObj.zipCode;
        // var parks = generateParks(zipCode, dbParks);
        //  console.log(parks);
        var distanceArr = [];

        if (zipCode != "") {
          for (var i = 0; i < dbParks.length; i++) {
            var ktm = new KilometersToMiles();

            if (dbParks[i].address !== "") {
              distance.get(
                {
                  origin: zipCode,
                  destination: dbParks[i].address
                },
                function(err, data) {
                  if (err) return console.log(err);
                  distanceArr.push(ktm.get(parseInt(data.distance)));
                  // console.log(ktm.get(parseInt(data.distance)));
                  // dbParks[i].distance = data.distance;
                  // console.log(distanceArr);
                }
              );
            }
          }

          var parks = addDistance(distanceArr, dbParks);
          res.json(parks);
        } else {
          res.json(dbParks);
        }

        // console.log('distanceObj: ' + req.body.distanceObj.miles);
        // res.json(parks);
        // if (true) {
      });
    }
    // console.log("dbCalled");
  });

  function addDistance(distanceArr, dbParks) {
    // console.log("working");
    for (var i = 0; i < dbParks.length; i++) {
      // console.log("running");
      dbParks[i].dataValues.distance = distanceArr[i];
      // console.log(dbParks[i].dataValues.distance);
      // console.log(distanceArr[i]);
    }
    return dbParks;
  }

  // Posting new profiles through Dogs.js model
  app.post("/api/newDog", function(req, res) {
    console.log("New Profile:  ");
    console.log(req.body);
    db.Dog.create({
      name: req.body.dogName,
      breed: req.body.dogBreed,
      picture: req.body.dogPic,
      gender: req.body.gender,
      description: req.body.dogDescription,
      likes_dogs: req.body.otherDogs,
      likes_people: req.body.kids
    });
  });

  app.post("/uploadpic", function(req, res) {});
};
