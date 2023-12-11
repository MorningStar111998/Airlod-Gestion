// tableSort.js

function initTableSort() {
  $("th").on("click", function () {
    var column = $(this).data("column");
    var order = $(this).data("order");

    // Retrieve table rows and convert to array of objects
    var dataArray = $("tbody tr")
      .map(function () {
        return {
          numDemande: parseInt($(this).find("td:eq(0)").text()) || 0,
          nomClient: $(this).find("td:eq(1)").text(),
          numTelephone: parseInt($(this).find("td:eq(2)").text()) || 0,
          typeClient: $(this).find("td:eq(3)").text(),
          etapeActuelle: $(this).find("td:eq(4)").text(),
          produit: $(this).find("td:eq(5)").text(),
          quantite: parseInt($(this).find("td:eq(6)").text()) || 0,
          email: $(this).find("td:eq(7)").text(),
          source: $(this).find("td:eq(8)").text(),
          numfacture: parseInt($(this).find("td:eq(9)").text()) || "",
        };
      })
      .get();

    // Toggle order on each click
    if (order == "ASC") {
      dataArray = dataArray.sort((a, b) => (a[column] > b[column] ? -1 : 1));
      $(this).data("order", "DESC");
      $(`.arrow-${column}`).html("&#9660;");
      $(".arrow").css("color","black")
      $(`.arrow-${column}`).css("color", "green");
    } else if (order == "DESC") {
      dataArray = dataArray.sort((a, b) => (a[column] < b[column] ? -1 : 1));
      $(this).data("order", "ASC");
        $(`.arrow-${column}`).html("&#9650;");
        $(".arrow").css("color", "black");
        $(`.arrow-${column}`).css("color", "green");
    }

    // Update the table
    updateTable(dataArray);
  });
}

function updateTable(dataArray) {
  // Clear existing table rows
  $("tbody").empty();

  // Append new rows based on sorted data
  dataArray.forEach(function (row) {
    var newRow = `<tr class="table-row">
      <td>${row.numDemande}</td>
      <td>${row.nomClient}</td>
      <td>${row.numTelephone}</td>
      <td>${row.typeClient}</td>
      <td>${row.etapeActuelle}</td>
      <td>${row.produit}</td>
      <td>${row.quantite}</td>
      <td>${row.email}</td>
      <td>${row.source}</td>
      <td>${row.numfacture}</td>
    </tr>`;
    $("tbody").append(newRow);
  });
}

// Initialize the table sorting script
$(document).ready(function () {
  initTableSort();
});
