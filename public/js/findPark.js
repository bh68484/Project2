console.log("findPark.js working");
var currentPark = $("#parkButton").attr("value");

$("#parkButton").click(function(username) {
  console.log(currentPark);
  localStorage.setItem("currentPark", currentPark);
  $.get("/api/parks").then(function(dbParks) {
    console.log(dbParks);
    $(".dogsIn").empty();
    //Switch out "dogsIn" w/ whatever it's called in JSON//
    for (var i = 0; i < dbParks.dogsIn.length; i++) {
      var newChip = $("<div class='chip'>");
      newChip.text(dbParks.dogsIn[i]);
      $(".dogsIn").append(newChip);
    }
  });
});

// $("#letsGo").click(function() {});

// $("#parkButton").click(function() {
//   $.get("/api/dogs").then(function(dbDogs) {
//     var newLine = $("<p>");
//     var newLabel = $("<label>");
//     var newInput = $("<input type='checkbox' />");
//     var newSpan = $("<span>" + dbDogs.name + "</span>");
//     newLabel.attr("for", dbDogs.name);
//     newInput.attr("id", dbDogs.name);

//     newInput.append(newSpan);
//     newLabel.append(newInput);
//     newLine.append(newLabel);
//     console.log("Works!");
//   });
// });
