(function($) {
  $(function() {
    $(".sidenav").sidenav();
    $(".modal").modal();
    $(".modal-trigger").leanModal();
    $(".modal").modal();

    //now you can open modal from code
    $("#modal1").modal("open");
     $("#modal1").modal("show");

    //or by click on trigger
    $(".trigger-modal").modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space
