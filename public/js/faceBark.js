// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".modal");
//   var instances = M.Modal.init(elems, options);
// });
var dogPicture;
console.log("working");

$(document).ready(function() {
  $(".modal").modal();
  $("select").formSelect();
});

$("#submit").click(function() {
  event.preventDefault();

  var dogName = $("#dog-name").val();
  var dogBreed = $("#dog-breed").val();
  //var dogPic = $("#dogPic").val();
  var gender = $("#gender").val();
  var kids = $("#kids").prop("checked");
  var otherDogs = $("#otherDogs").prop("checked");
  var dogComment = $("#dogComment").val();
  //console.log(dogName, dogBreed);

  var dogObject = {
    dogName: dogName,
    dogBreed: dogBreed,
    //dogPic: dogPicture,
    gender: gender,
    dogDescription: dogComment,
    otherDogs: otherDogs,
    kids: kids
  };

  console.log(dogObject);
  $.post("/api/newDog", dogObject).then(function(data) {
    console.log(data);

    res.render("dashboard");
  });

  //dogPicture = null;
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".autocomplete");
  var instances = M.Autocomplete.init(elems, options);
});

// Or with jQuery

// $("#dogPic").on("change", function(ev) {
//   var file = ev.target.files[0];
//   // console.log(ev.target.files[0]);
//   // console.log("Picture Upload Works");

//   var reader = new FileReader();
//   console.log(reader);
//   reader.onloadend = function(e) {
//     console.log(e.target.result);
//     dogPicture = e.target.result;
//   };
//   reader.readAsDataURL(file);
// });

$(document).ready(function() {
  var dogBreedsList = [];
  var dogObject;
  $.get("https://dog.ceo/api/breeds/list/all", function(data, status) {
    var dogObject = data.message;
    for (var key in dogObject) {
      dogObject[key] = null;
    }
    console.log(dogObject);
    $("input.autocomplete").autocomplete({
      data: dogObject
    });
    console.log(dogObject);
  });
});
