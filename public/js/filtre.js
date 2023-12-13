// Updated Event Listener
$("#typeClientFilter").on("change", function () {
  // Get the selected typeClient
  const selectedTypeClient = $(this).val();

  // Make an AJAX request to the server with the selected typeClient
  $.ajax({
    url: "/mes_demandes/filterTypeClient",
    type: "POST",
    data: { typeClient: selectedTypeClient },
    success: function (data) {
      // Update the table with the received data
      updateTable(data);
    },
    error: function (error) {
      console.error("Error filtering data: ", error);
    },
  });
});


$("#etapeActuelle").on("change", function () {
  // Get the selected etapeActuelle
  const selectedEtapeActuelle = $(this).val();

  // Make an AJAX request to the server with the selected etapeActuelle
  $.ajax({
    url: "/mes_demandes/filterEtapeActuelle",
    type: "POST",
    data: { etapeActuelle: selectedEtapeActuelle },
    success: function (data) {
      // Update the table with the received data
      updateTable(data);
    },
    error: function (error) {
      console.error("Error filtering data: ", error);
    },
  });
});


$("#filtreSource").on("change", function () {
  // Get the selected source
  const selectedSource = $(this).val();

  // Make an AJAX request to the server with the selected source
  $.ajax({
    url: "/mes_demandes/filterSource",
    type: "POST",
    data: { source: selectedSource },
    success: function (data) {
      // Update the table with the received data
      updateTable(data);
    },
    error: function (error) {
      console.error("Error filtering data: ", error);
    },
  });
});


$("#etatClient").on("change", function () {
  // Get the selected etatClient
  const selectedEtatClient = $(this).val();

  // Make an AJAX request to the server with the selected etatClient
  $.ajax({
    url: "/mes_demandes/filterEtatClient",
    type: "POST",
    data: { etatClient: selectedEtatClient },
    success: function (data) {
      // Update the table with the received data
      updateTable(data);
    },
    error: function (error) {
      console.error("Error filtering data: ", error);
    },
  });
});
