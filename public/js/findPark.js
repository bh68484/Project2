var username;

$("#parkButton").click(function() {
  $.get("/api/dogs", function(req, res) {
    db.Dogs.findAll({
      where: {
        username: username
      }
    }).then(function(dbDogs) {
      console.log(dbDogs);
      var newLine = $("<p>");
      newLine.append("<label>");
      newLine.append("<input type='checkbox' />");
      newLine.attr("value", dbDogs.name);
      newLine.append("<span>" + dbDogs.name + "</span>");
      $("#dogsToTake").append(newLine);
    });
  });
});
