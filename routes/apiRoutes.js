var path = require("path");

var db = require("../models");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

var googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDimcyIaL5TsDxagrIOyFRuDTlfQg3J0uU"
});

// var reverseGeocode = require('latlng-to-zip');
var distance = require("google-distance");
var KilometersToMiles = require("kilometers-to-miles");

module.exports = function(app, user) {
  //Getting the park data used by Google Maps App
  app.get("/api/parks", function(req, res) {
    db.parks.findAll({}).then(function(dbParks) {
      res.json(dbParks);
    });
  });

  // app.get("/api/parks/locationsearch", function(req, res) {
  //   googleMapsClient.distanceMatrix(
  //     {
  //       origins: [
  //         "1600 Amphitheatre Parkway, Mountain View, CA",
  //         "15 E. Peace St. Raleigh, NC"
  //       ],
  //       destinations: ["Cary, NC"],
  //       mode: "driving"
  //     },
  //     function(err, response) {
  //       if (!err) {
  //         console.log(err);
  //         res.json(response);
  //         console.log("No Error in Distance Search");
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   );
  // });

  //Getting all dogs
  app.get("/api/dogs", function(req, res) {
    db.dog.findAll({}).then(function(dbDogs) {
      res.json(dbDogs);
    });
  });

  app.get("/api/dogs/:id", function(req, res) {
    db.dog
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbDog) {
        res.json(dbDog);
      });
  });

  app.post("/api/parkSearch", function(req, res) {
    var searchArr = req.body.data;

    var obj = {};

    if (searchArr !== undefined) {
      searchArr.forEach(function(data) {
        obj[data[0]] = data[1];
      });

      db.parks
        .findAll({
          where: {
            [Op.or]: [obj]
          }
        })
        .then(function(dbParks) {
          var zipCode = req.body.distanceObj.zipCode;

          var distanceArr = [];

          if (zipCode != "") {
            var holder = 0;
            for (var i = 0; i < dbParks.length; i++) {
              var ktm = new KilometersToMiles();

              if (dbParks[i].address == "") {
                holder++;
              }
              if (dbParks[i].address !== "") {
                distance.get(
                  {
                    origin: zipCode,
                    destination: dbParks[i].address
                  },
                  function(err, data) {
                    if (err) return console.log(err);

                    distanceArr.push(ktm.get(parseInt(data.distance)));

                    if (distanceArr.length + holder == dbParks.length) {
                      var parks = addDistance(distanceArr, dbParks);
                      res.json(parks);
                    }
                  }
                );
              }
            }
          } else {
            res.json(dbParks);
          }
        });
    } else {
      db.parks.findAll({}).then(function(dbParks) {
        var zipCode = req.body.distanceObj.zipCode;
        var distanceArr = [];
        if (zipCode != "") {
          for (var i = 0; i < 100; i++) {
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
                  if (distanceArr.length == 100) {
                    var parks = addDistance(distanceArr, dbParks);
                    res.json(parks);
                  }
                }
              );
            }
          }
        } else {
          res.json(dbParks);
        }
      });
    }
  });

  function addDistance(distanceArr, dbParks) {
    if (distanceArr.length === 100) {
      for (var i = 0; i < 100; i++) {
        dbParks[i].dataValues.distance = distanceArr[i];
      }
      return dbParks;
    } else {
      for (var i = 0; i < dbParks.length; i++) {
        dbParks[i].dataValues.distance = distanceArr[i];
      }
      return dbParks;
    }
  }

  // Posting new profiles through Dogs.js model
  app.post("/api/newDog", function(req, res) {
    console.log("New Profile:  ");
    console.log(req.body);
    console.log(req.user);

    db.dog.create({
      name: req.body.dogName,
      breed: req.body.dogBreed,
      picture: req.body.dogPic,
      gender: req.body.gender,
      description: req.body.dogDescription,
      likes_dogs: req.body.otherDogs,
      likes_people: req.body.kids,
      userId: req.user.id
    });
  });

  app.post("/picupload", function(req, res) {
    if (req.files) {
      console.log(req.files);
    }
  });

  app.put("/api/addDogToPark/:parkid/:dogid", function(req, res) {
    console.log(req.params.dogId, req.params.parkid);
    db.dog
      .update(
        { parkId: req.params.parkid },
        { where: { id: req.params.dogid } }
      )
      .then(function(dbDogs) {
        res.json(dbDogs);
      });
  });

  //Find all the dogs in a park
  app.get("/api/dogsInPark/:parkid", function(req, res) {
    db.dog
      .findAll({
        where: { parkId: req.params.parkid }
      })
      .then(function(dbDog) {
        res.json(dbDog);
      });
  });

  app.get("/api/getUsersDogs", function(req, res) {
    db.dog
      .findAll({
        where: { userId: req.user.id }
      })
      .then(function(dbDogs) {
        res.json(dbDogs);
      });
  });
};
