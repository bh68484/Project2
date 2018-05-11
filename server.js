//Requiring dependencies
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");

//Setting up the Express App
var app = express();
var upload = require("express-fileupload");
var PORT = process.env.PORT || 8080;

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

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/home-notlogged.html"));
});

// Static directory
app.use(express.static("public"));

//For Handlebars
app.set("views", "./views");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

var models = require("./models");
//Routes`
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app, models.User);
var authRoute = require("./routes/auth.js")(app, passport);
//load passport strategies
require("./config/passport/passport.js")(passport, models.user);

//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

//Setting up Express to listen on port.
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

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
    db.parks.create({
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

// models.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });
