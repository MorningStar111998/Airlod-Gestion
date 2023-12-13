$("#rechercheInput, #rechercheCategorie").on("input change", function (){
  // Get the input text and topic
  const textSearchInput = $(this).val();
  const searchSelectedTopic = $("#rechercheCategorie").val();

  // Make an AJAX request to the server with the search and selected categorie
  $.ajax({
    url: "/mes_demandes/recherche",
    type: "POST",
    data: {
      searchInput: textSearchInput,
      searchCategorie: searchSelectedTopic
    },
    success: function (data) {
      // Update the table with the received data
      updateTable(data);
    },
    error: function (error) {
      console.error("Error filtering data: ", error);
    },
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   // Attaching an input event listener to the search input field
//   document.getElementById("search-bar-text").addEventListener("input", recherche);

//   // Attaching change event listener to the select element
//   document.getElementById("search-bar-option").addEventListener("change", recherche);
// });

// function recherche() {
//   var input, filter, tableRows, tableData, txtValue, i, selectedOption;

//   input = document.getElementById("search-bar-text");
//   filter = input.value.toUpperCase();
//   tableRows = document.getElementsByClassName("table-row");

//   // Get the value of the selected option
//   selectedOption = document.getElementById("search-bar-option").value;

//   for (i = 0; i < tableRows.length; i++) {
//     // Get the column index based on the selected option
//     let columnIndex = getColumnIndex(selectedOption);

//     // Retrieve the corresponding table data based on the column index
//     tableData = tableRows[i].getElementsByTagName("td")[columnIndex];

//     if (tableData) {
//       txtValue = tableData.textContent || tableData.innerText;

//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tableRows[i].style.display = "";
//       } else {
//         tableRows[i].style.display = "none";
//       }
//     }
//   }
// }

// function getColumnIndex(selectedOption) {
//   // Mapping the selected option value to the corresponding column index
//   switch (selectedOption) {
//     case "search-nomClient":
//       return 1; // Column index for "Nom du Client" (assuming it's the second column)
//     case "search-tel":
//       return 2; // Column index for "Numéro de Téléphone"
//     case "search-email":
//       return 7; // Column index for "E-mail"
//     case "search-produit":
//       return 5; // Column index for "Produit"
//     default:
//       return 1; // Default to searching in the second column
//   }
// }

// **************************Fonction Correcte sans le select

// document.addEventListener("DOMContentLoaded", function () {
//   // Attaching an input event listener to the search input field
//   document.getElementById("search-bar-text").addEventListener("input", tri);
// });

// function tri() {
//   var input, filter, tableRows, tableData, txtValue, i;

//   input = document.getElementById("search-bar-text");
//   filter = input.value.toUpperCase();
//   tableRows = document.getElementsByClassName("table-row");

//   for (i = 0; i < tableRows.length; i++) {
//     tableData = tableRows[i].getElementsByTagName("td")[1]; // Second column (index 1)

//     if (tableData) {
//       txtValue = tableData.textContent || tableData.innerText;

//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tableRows[i].style.display = "";
//       } else {
//         tableRows[i].style.display = "none";
//       }
//     }
//   }
// }
