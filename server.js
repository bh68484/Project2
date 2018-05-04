//Requiring dependencies
var express = require("express");
var bodyParser = require("body-parser");

//Setting up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

//Routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

//Setting up Express to listen on port.
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
