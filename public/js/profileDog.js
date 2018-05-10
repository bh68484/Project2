var dogName;

$(document).ready(function() {
  $.get("/api/dogs", function(req, res) {
    db.Dog.findAll({
      where: {
        name: dogName
      }
    }).then(function(dbDogs) {
      console.log(dbDogs);
      $("#title").text("Hello, " + dbDogs.name + "!");
      $("subTitle").text("Here's " + dbDogs.name + "'s Profile Information");
      $("#dogInfo").empty();
      var newDiv = $("<div>");
      var newLine = $("<h4>");
      newLine.append(dbDogs.breed);
    });
  });
});
