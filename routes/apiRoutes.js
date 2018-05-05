var path = require("path");

module.exports = function(app) {
  //Getting the park data used by Google Maps App
  app.get("/api/parks", function(req, res) {});
  //Getting all dogs
  app.get("/api/dogs", function(req, res) {});
  //Posting new profiles through Dogs.js model
  app.post("/api/new", function(req, res) {
    console.log("New Profile:  ");
    console.log(req.body);
    Dog.create({
      name: req.body.dogName,
      breed: req.body.dogBreed,
      picture: req.body.dogPic,
      gender: req.body.gender,
      owner: req.body.owner,
      comment: req.body.dogComment,
      email: req.body.email,
      password: req.body.password,
      likes_dogs: req.body.otherDogs,
      likes_people: req.body.kids
    });
  });
};
