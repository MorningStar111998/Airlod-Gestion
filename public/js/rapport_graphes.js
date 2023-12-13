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

      const a = data.whatsappRowCount;
      var myChart = echarts.init(document.getElementById("main"));

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
            "Landing Page",
            "Site",
            "Bouche à Oreil",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "sales",
            type: "bar",
            data: [5, a, 36, 10, 10, 20],
          },
        ],
      };

      myChart.setOption(option);
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
      indexAxis:"y",
  },
});
