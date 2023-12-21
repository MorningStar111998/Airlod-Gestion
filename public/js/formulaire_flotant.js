$(document).ready(function () {
  // Open the form modal when the button is clicked
  $("#ajouter-demande-form-button").click(function () {
      $("#ajouter-demande-form").fadeIn();
      $(".form").css("margin-top",20)
  });

  // Close the form modal when clicking outside the form
  $(document).mouseup(function (e) {
    var modal = $(".form");
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      $("#ajouter-demande-form").fadeOut();
    }
  });
});



