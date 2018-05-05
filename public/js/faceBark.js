// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".modal");
//   var instances = M.Modal.init(elems, options);
// });
console.log("working");

$(document).ready(function() {
  $(".modal").modal();
  $("select").formSelect();
});

$("#submit").click(function() {
  event.preventDefault();

  var dogName = $("#dog-name")
    .val()
    .trim();
  var dogBreed = $("#dog-breed")
    .val()
    .trim();
  var dogPic = $("#dogPic")
    .val()
    .trim();
  var gender = $("#gender")
    .val()
    .trim();
  var kids = $("#kids")
    .val()
    .trim();
  var otherDogs = $("#otherDogs")
    .val()
    .trim();
  var owner = $("#owner-name")
    .val()
    .trim();
  var dogComment = $("#dogComment")
    .val()
    .trim();
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();

  $.post("/api/new", newProfile).then(function(data) {
    console.log(data);
  });
});
