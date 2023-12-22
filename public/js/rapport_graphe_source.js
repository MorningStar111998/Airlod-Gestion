$("#afficherRapports").on("click", function () {
  $.ajax({
    url: "/combinedDataSources",
    type: "GET",
    success: function (data) {
      function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
          dataset.data.pop();
        });
        chart.update();
      }
      function addData(chart, label, newData) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
          dataset.data.push(newData);
        });
        chart.update();
      }

      const whatsappNumb = data.whatsappData;
      const messengerNumb = data.messengerData;
      const instagramNumb = data.instagramData;
      const siteNumb = data.siteData;
      const landingNumb = data.landingData;
      const baONumb = data.baOData;
      const nullSourcesNumb = data.nullSourcesData;

      var numbDemandes = data.numbDemandes.demandesAuj;
      var numbFactures = data.numbFactures.facturesAuj;
      var numbEnvoyes = data.numbEnvoyes.envoyesAuj;

      $("#kpi-data-1").text(numbDemandes);
      $("#kpi-data-2").text(numbEnvoyes);
      $("#kpi-data-3").text(numbFactures);

      const ctx = document.getElementById("sourceChart");
      const dataSetSources = [
        whatsappNumb,
        messengerNumb,
        instagramNumb,
        siteNumb,
        landingNumb,
        baONumb,
        nullSourcesNumb,
      ];

      const myChart = new Chart(ctx, {
        type: "pie",
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
              data: dataSetSources,
              backgroundColor: [
                "#65B741",
                "#009ef7",
                "#f27a1d",
                "#c0ab55",
                "#d30000",
                "#f3f1f4",
                "#7c7c7c",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });
      //update time of search
      $("#tempsRapport").on("change", function () {
        var selectedValue = $(this).val();

        if (selectedValue === "auj") {
          numbDemandes = data.numbDemandes.demandesAuj;
          numbFactures = data.numbFactures.facturesAuj;
          numbEnvoyes = data.numbEnvoyes.envoyesAuj;

          myChart.update();
          $("#kpi-data-1").text(numbDemandes);
          $("#kpi-data-2").text(numbEnvoyes);
          $("#kpi-data-3").text(numbFactures);
        } else if (selectedValue === "mois") {
          numbDemandes = data.numbDemandes.demandesThisMonth;
          numbFactures = data.numbFactures.facturesThisMonth;
          numbEnvoyes = data.numbEnvoyes.envoyesThisMonth;
          myChart.update();

          $("#kpi-data-1").text(numbDemandes);
          $("#kpi-data-2").text(numbEnvoyes);
          $("#kpi-data-3").text(numbFactures);
        } else if (selectedValue === "annee") {
          numbDemandes = data.numbDemandes.demandesThisYear;
          numbFactures = data.numbFactures.facturesThisYear;
          numbEnvoyes = data.numbEnvoyes.envoyesThisYear;
          myChart.update();

          $("#kpi-data-1").text(numbDemandes);
          $("#kpi-data-2").text(numbEnvoyes);
          $("#kpi-data-3").text(numbFactures);
        } else {
          console.log("Another option is selected");
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching combined data:", error);
    },
  });
});
