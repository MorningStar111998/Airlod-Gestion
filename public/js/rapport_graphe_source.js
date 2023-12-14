// Function to handle the button click
$("#afficherRapports").on("click", function () {
  // Make an AJAX request to get the row count when the button is clicked
  $.ajax({
    url: "/mes_demandes/whatsappRowCount",
    type: "GET",
    success: function (data) {
      // Handle the success response, for example, log the data
      console.log(
        "Number of rows with source 'Whatsapp':",
        data.whatsappRowCount
      );

      const whatsappNumb = data.whatsappRowCount;
      $.ajax({
        url: "/mes_demandes/instagramRowCount",
        type: "GET",
        success: function (data) {
          console.log(
            "Number of rows with source 'Instagram':",
            data.instagramRowCount
          );
          const instagramNumb = data.instagramRowCount;
          $.ajax({
            url: "/mes_demandes/messengerRowCount",
            type: "GET",
            success: function (data) {
              const messengerNumb = data.messengerRowCount;
              console.log(
                "Number of rows with source 'Messenger':",
                messengerNumb
              );
              $.ajax({
                url: "/mes_demandes/siteRowCount",
                type: "GET",
                success: function (data) {
                  console.log(
                    "Number of rows with source 'Site':",
                    data.siteRowCount
                  );
                  const siteNumb = data.siteRowCount;
                  $.ajax({
                    url: "/mes_demandes/landingRowCount",
                    type: "GET",
                    success: function (data) {
                      console.log(
                        "Number of rows with source 'landing':",
                        data.landingRowCount
                      );
                      const landingNumb = data.landingRowCount;
                      $.ajax({
                        url: "/mes_demandes/baORowCount",
                        type: "GET",
                        success: function (data) {
                          console.log(
                            "Number of rows with source 'Bouche à Oreil':",
                            data.baORowCount
                          );
                          const baONumb = data.baORowCount;
                          $.ajax({
                            url: "/mes_demandes/ndRowCount",
                            type: "GET",
                            success: function (data) {
                              console.log(
                                "Number of rows with source 'Non Définie':",
                                data.ndRowCount
                              );
                              const ndNumb = data.ndRowCount;
                              var myChart = echarts.init(
                                document.getElementById("main")
                              );

                              var option = {
                                title: {
                                  text: "Rapport Type de Clients",
                                },
                                tooltip: {},
                                legend: {
                                  data: ["sales"],
                                },
                                xAxis: {
                                  data: [
                                    "Whatsapp",
                                    "Messenger",
                                    "Instagram",
                                    "Landing",
                                    "Site",
                                    "Bouche à Oreil",
                                    "Non Défini",
                                  ],
                                },
                                yAxis: {},
                                series: [
                                  {
                                    name: "sales",
                                    type: "bar",
                                    data: [
                                      whatsappNumb,
                                      instagramNumb,
                                      messengerNumb,
                                      landingNumb,
                                      siteNumb,
                                      baONumb,
                                      ndNumb,
                                    ],
                                  },
                                ],
                              };

                              myChart.setOption(option);
                            },
                            error: function (error) {
                              // Handle the error response, for example, log the error
                              console.error(
                                "Error fetching row count: ",
                                error
                              );
                            },
                          });
                        },
                        error: function (error) {
                          // Handle the error response, for example, log the error
                          console.error("Error fetching row count: ", error);
                        },
                      });
                    },
                    error: function (error) {
                      // Handle the error response, for example, log the error
                      console.error("Error fetching row count: ", error);
                    },
                  });
                },
                error: function (error) {
                  // Handle the error response, for example, log the error
                  console.error("Error fetching row count: ", error);
                },
              });
            },
            error: function (error) {
              // Handle the error response, for example, log the error
              console.error("Error fetching row count: ", error);
            },
          });
        },
        error: function (error) {
          // Handle the error response, for example, log the error
          console.error("Error fetching row count: ", error);
        },
      });
    },
    error: function (error) {
      // Handle the error response, for example, log the error
      console.error("Error fetching row count: ", error);
    },
  });
});

const ctx = document.getElementById("sourceChart");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 12, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const ctx2 = document.getElementById("etapeChart");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 12, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    indexAxis: "y",
  },
});
