var currentPark = $("#parkButton").attr("value");

$("#parkButton").click(function(username, currentPark) {
  $.get("/api/dogs", function(req, res) {
    db.Dogs.findAll({
      where: {
        username: username
      }
    }).then(function(dbDogs) {
      console.log(dbDogs);

      var newLine = $("<p>");
      var newLabel = $("<label>");
      var newInput = $("<input type='checkbox' />");
      var newSpan = $("<span>" + dbDogs.name + "</span>");
      newLabel.attr("for", dbDogs.name);
      newInput.attr("id", dbDogs.name);

      newInput.append(newSpan);
      newLabel.append(newInput);
      newLine.appendI(newLabel);

      $("#dogsToTake").append(newLine);
    });
  });
  $.get("/api/parks", function(req, res) {
    db.Parks.findAll({
      where: {
        park: currentPark
      }
    }).then(function(dbParks) {
      console.log(dbParks);
      $(".dogsIn").empty();
      for (var i = 0; i < dbParks.dogsIn.length; i++) {
        //Switch out "dogsIn" w/ whatever it's called in JSON//
        var newChip = $("<div class='chip'>");
        newChip.text(dbParks.dogsIn[i]);
        $(".dogsIn").append(newChip);
      }
    });
  });
});

$("#letsGo").click(function() {});
