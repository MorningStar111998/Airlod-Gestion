// Add this in your client-side script
$("#sourceFilter").on("change", function () {
  // Get the selected source
  const selectedSource = $(this).val();

  // Make an AJAX request to the server with the selected source
  $.ajax({
    url: "/mes_demandes/filter", // Your server endpoint for handling filters
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
