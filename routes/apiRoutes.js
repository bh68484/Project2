var path = require("path");

var db = require("../models");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

var googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDimcyIaL5TsDxagrIOyFRuDTlfQg3J0uU"
});

// var reverseGeocode = require('latlng-to-zip');
var distance = require('google-distance');
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
    console.log("called");
    // console.log(req.body.distanceObj);

    var searchArr = req.body.data;
    // var distanceArr = [];
    var obj = {};
    searchArr.forEach(function(data) {
      obj[data[0]] = data[1];
    });
    // console.log(obj);

    db.Parks.findAll({
      where: {
        [Op.or]: [obj]
      }
    }).then(function(dbParks) {
      
      var distanceArr = [];
      // console.log(dbParks);
      for (var i = 0; i < dbParks.length; i++) {
          // console.log(req.body.distanceObj.zipCode);
          // console.log(dbParks[i].address);
          var ktm = new KilometersToMiles();

          distance.get(
          {
            origin: req.body.distanceObj.zipCode,
            destination: dbParks[i].address
          },
          function(err, data) {
            if (err) return console.log(err);
            distanceArr.push(ktm.get(parseInt(data.distance)));
            // console.log(ktm.get(parseInt(data.distance)));
            // dbParks[i].distance = data.distance;
            console.log(distanceArr);
        })
      }

      // console.log(distanceArr.length);

      // for (var i = 0; i < dbParks.length; i++) {
      //   console.log("running");
      //   dbParks[i].dataValues.distance = distanceArr[i];
      //   console.log(dbParks[i].distance);
      // }

      // console.log(dbParks[0].dataValues);
      res.json(dbParks);
      // res.json(dbParks, distanceArr);
    });
    console.log("dbCalled");
  });

  //Posting new profiles through Dogs.js model
  // app.post("/api/newDog", function(req, res) {
  //   console.log("New Profile:  ");
  //   console.log(req.body);
  //   db.Dog.create({
  //     name: req.body.dogName,
  //     breed: req.body.dogBreed,
  //     picture: req.body.dogPic,
  //     gender: req.body.gender,
  //     description: req.body.dogDescription,
  //     likes_dogs: req.body.otherDogs,
  //     likes_people: req.body.kids
  //   });
  // });
};
