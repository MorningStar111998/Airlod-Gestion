document.addEventListener("DOMContentLoaded", function () {
  // Attach change event listener to the 'Type de Client' select tag
  document
    .getElementById("type-de-client")
    .addEventListener("change", filterRows);
});

function filterRows() {
  var rows = document.getElementsByClassName("table-row");
  var typeClientFilter = document
    .getElementById("type-de-client")
    .value.toUpperCase();

  for (var i = 0; i < rows.length; i++) {
    var typeClient =
      rows[i].querySelector(".type-client").innerText.toUpperCase() ||
      rows[i].querySelector(".type-client").textContent.toUpperCase();

    // Toggle row display based on selected option in 'Type de Client' (case-insensitive)
    if (typeClient === typeClientFilter || typeClientFilter === "") {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}
