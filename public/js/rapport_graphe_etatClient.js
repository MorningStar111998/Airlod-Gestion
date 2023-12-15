$("#afficherRapports").on("click", function () {
  $.ajax({
    url: "/combinedDataEtatClient",
    type: "GET",
    success: function (data) {
      const clientInteresseNumb = data.clientInteresseData;
        const enDiscussionNumb = data.enDiscussionData;
        const attenteDeLogoNumb = data.attenteDeLogoData;
        const attenteDeConfirmationNumb = data.attenteDeConfirmationData;
        const pasDeReponseNumb = data.pasDeReponseData;
        const nonInteresseNumb = data.nonInteresseData;

        const ctx = document.getElementById("etatClientChart");

        const a = clientInteresseNumb + enDiscussionNumb;
        const b = attenteDeLogoNumb + attenteDeConfirmationNumb;
        const c = pasDeReponseNumb + nonInteresseNumb;

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Intéressé/En Discussion",
            "Attente De Logo/Attente de Confirmation",
            "Pas de Réponse/Non Intéressé",
          ],
          datasets: [
            {
              label: "Etat des Clients",
              data: [a, b, c],
              backgroundColor: ["#65B741", "#FB8B24", "#D71313"],
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
