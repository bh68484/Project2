console.log("profilePark.js");
var currentPark = localStorage.getItem("currentPark");

$(document).ready(function(username) {
  console.log(currentPark);
  console.log("clicked");
  $("#title").text("You're Going to " + currentPark + "!");
  // console.log(userid);
  $.get("/api/parks").then(function(dbParks) {
    console.log(dbParks);
    for (var i = 0; i < dbParks.length; i++) {
      if (currentPark === dbParks[i].name) {
        console.log(dbParks[i].name);
        console.log("this one");
        $("#parkInfo").empty();
        var newLine = $("<h4>");
        newLine.append("Dogpark:  " + dbParks[i].dogpark + "</p>");
        newLine.append("Field:  " + dbParks[i].field + "</p>");
        newLine.append(
          "Greenway Access:  " + dbParks[i].greenwayAcess + "</p>"
        );
        newLine.append("Restrooms:  " + dbParks[i].restrooms + "</p>");

        $("#parkInfo").append(newLine);
      }
    }
  });
});
