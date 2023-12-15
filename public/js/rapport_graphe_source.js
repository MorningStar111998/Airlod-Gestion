$("#afficherRapports").on("click", function () {
  $.ajax({
    url: "/combinedDataSources",
    type: "GET",
    success: function (data) {
      const whatsappNumb = data.whatsappData;
      const messengerNumb = data.messengerData;
      const instagramNumb = data.instagramData;
      const siteNumb = data.siteData;
      const landingNumb = data.landingData;
      const baONumb = data.baOData;
      const nullSourcesNumb = data.nullSourcesData;
      const ctx = document.getElementById("sourceChart");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "Whatsapp",
            "Messenger",
            "Instagram",
            "Site",
            "Landing Page",
            "Bouche à Oreil",
            "Non Défini",
          ],
          datasets: [
            {
              label: "Origine des Clients",
              data: [
                whatsappNumb,
                messengerNumb,
                instagramNumb,
                siteNumb,
                landingNumb,
                baONumb,
                nullSourcesNumb,
              ],
              backgroundColor: [
                "#65B741",
                "#009ef7",
                "#f27a1d",
                "#000000",
                "#a1313c",
                "#f3f1f4",
                "#7c7c7c",
              ],
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
    },
    error: function (xhr, status, error) {
      console.error("Error fetching combined data:", error);
    },
  });
});
