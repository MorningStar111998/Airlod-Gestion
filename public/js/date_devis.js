$(document).ready(function () {
  var currentDate = new Date();

  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Months are zero-based
  var year = currentDate.getFullYear();

  var formattedDate = day + "/" + month + "/" + year;

  $("#dateAuj").text(formattedDate);
});
