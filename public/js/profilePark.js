console.log("profilePark.js");
var currentPark = localStorage.getItem("currentPark");

$(document).ready(function(username) {
  console.log(currentPark);
  console.log("clicked");
  $("#title").text("You're Going to " + currentPark + "!");
  // console.log(userid);
  $.get("/api/getUsersDogs").then(function(dbDogs) {
    console.log(dbDogs);
  });
});
console.log("done");
