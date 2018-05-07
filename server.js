//Requiring dependencies
var express = require("express");
var bodyParser = require("body-parser");

//Setting up the Express App
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");
var path = require("path");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 1000000
  })
);
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

// Static directory
app.use(express.static("public"));

//Routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

//Setting up Express to listen on port.
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

// ======================================================================
// this is the route to handle the app.html page
// app.html makes the ajax call

app.get("/app", function(req, res) {
  res.sendFile(path.join(__dirname, "app.html"));
});

// -----------------------------------------------
// this route recieves the data loops through and creates the table

app.post("/dataSet", function(req, res) {
  var myResponse = req.body;
  console.log(res);
  // console.log(myResponse.features[0].attributes, myResponse.features[0].attributes.LAT);
  for (var i = 0; myResponse.features.length > i; i++) {
    db.Parks.create({
      name: myResponse.features[i].attributes.NAME,
      address: myResponse.features[i].attributes.ADDRESS,
      dogpark: myResponse.features[i].attributes.DOGPARK,
      greenwayAcess: myResponse.features[i].attributes.GREENWAYACCESS,
      walkingTrails: myResponse.features[i].attributes.WALKINGTRAILS,
      restrooms: myResponse.features[i].attributes.RESTROOMS,
      field: myResponse.features[i].attributes.MULTIPURPOSEFIELD,
      url: myResponse.features[i].attributes.URL,
      lat: myResponse.features[i].attributes.Lat,
      lon: myResponse.features[i].attributes.Lon
    });
  }
});

// ------------------------------------------------
// this will drop and sync the table every time its run

// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });
