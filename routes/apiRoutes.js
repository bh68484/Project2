var path = require("path");

var db = require("../models");

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = function(app) {
  //Getting the park data used by Google Maps App
  app.get("/api/parks", function(req, res) {
    db.Park.find({}).then(function(dbParks) {
      res.json(dbParks);
    });
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
    console.log(req.body.data);

    var searchArr = req.body.data;

    var obj = {};
    searchArr.forEach(function(data){
        obj[data[0]] = data[1]
    });
    console.log(obj);

    db.Parks.findAll({
      where: {
        [Op.or]: [obj]
      }
    }).then(function(dbParks) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbParks);
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
