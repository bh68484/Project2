// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".modal");
//   var instances = M.Modal.init(elems, options);
// });
console.log("working");

$(document).ready(function() {
  $(".modal").modal();
  $("select").formSelect();
});
