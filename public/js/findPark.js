$(document).ready(function() {
  localStorage.removeItem("currentPark");
});

console.log("findPark.js is working");
var currentPark;
// console.log(currentPark);

$("body").on("click", "#parkButton", function() {
  console.log("btn click");
  var isStored = localStorage.getItem("currentPark");
  if (isStored != null) {
    localStorage.removeItem("currentPark");
  }
  currentPark = this.value;
  console.log(currentPark);
  localStorage.setItem("currentPark", currentPark);
  // $.get("/api/parks").then(function(dbParks) {
  //   console.log(dbParks);
  //   $(".dogsIn").empty();
  //   //Switch out "dogsIn" w/ whatever it's called in JSON//
  //   for (var i = 0; i < dbParks.dogsIn.length; i++) {
  //     var newChip = $("<div class='chip'>");
  //     newChip.text(dbParks.dogsIn[i]);
  //     $(".dogsIn").append(newChip);
  //   }
  // });
});

 $(document).on('click', '#parkButton', function(username) {
    console.log('clicked');
    // console.log(userid);
  $.get("/api/getUsersDogs", function(req, res) {
    
      console.log(req[0].name);
      var dog = $("<div id='dogs'>");
      var img = $("<img id='mydog' src='./images/dog4.jpg' alt='Dog Chip'>");
      dog.append(img);
      dog.append(req[0].name);
      $("#dogsToTake").append(dog);

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
