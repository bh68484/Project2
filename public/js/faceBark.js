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

  var dogName = $("#dog-name").val();
  var dogBreed = $("#dog-breed").val();
  var dogPic = $("#dogPic").val();

  var gender = $("#gender").val();

  var kids = $("#kids").val();

  var otherDogs = $("#otherDogs").val();

  // var owner = $("#owner-name")
  //   .val()
  //
  var dogComment = $("#dogComment").val();
  // var email = $("#email")
  //   .val()
  //
  // var password = $("#password")
  //   .val()
  //

  console.log(dogName, dogBreed);

  var dogObject = {
    dogName: dogName,
    dogBreed: dogBreed,
    dogPic: dogPic,
    gender: gender,
    dogDescription: dogComment,
    otherDogs: otherDogs,
    kids: kids
  };

  console.log(dogObject);
  $.post("/api/newDog", dogObject).then(function(data) {
    console.log(data);
  });
});
