$(document).ready(function () {
  $.ajax({
    url: "/mes_factures/table",
    type: "GET",
    success: function (data) {
      var tabledata = data;

      var table = new Tabulator("#tableFactures", {
        data: tabledata,
        layout: "fitDataTable",
        responsiveLayout: false,
        addRowPos: "top",
        history: true,
        pagination: "local",
        paginationSize: 10,
        paginationCounter: "rows",
        movableColumns: false,
        initialSort: [{ column: "name", dir: "asc" }],
        columnDefaults: {
          tooltip: true,
        },
        columns: [
          {
            formatter: "rowSelection",
            titleFormatter: "rowSelection",
            titleFormatterParams: {
              rowRange: "active",
            },
            hozAlign: "center",
            headerSort: false,
            download: false,
            maxWidth: 20,
          },

          {
            title: "N° Facture",
            field: "numFacture",
            editor: false,
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return (
                "<span style='color:#1d4ed8; font-weight:bold;'>" +
                value +
                "</span>"
              );
            },
            cellClick: function (e, cell) {
              var curFacture = cell.getRow().getData();

              Object.entries(curFacture).forEach((field) => {
                var element = document.getElementById(field[0]);
                if (element) {
                  element.value = field[1];
                  console.log(element.value);
                }
              });

              $("#telecharger-facture").fadeIn();
              $(".telecharger-facture-form").css("margin-top", 20);

              
            },
          },
          {
            title: "Prix",
            field: "prix",
            editor: true,
            width: 100,
          },
          {
            title: "Quantité",
            field: "quantite",
            width: 150,
            editor: false,
            hozAlign: "center",
          },
          {
            title: "Produit",
            field: "produit",
            width: 100,
            editor: false,
          },
          {
            title: "Nom Client",
            field: "nomClient",
            width: 130,
            editor: false,
            headerFilter: "input",
          },
          {
            title: "Telephone",
            field: "numTelephone",
            hozAlign: "center",
            headerFilter: "input",
          },
          {
            title: "Adresse",
            field: "adresse",
            editor: false,
          },
          {
            title: "Type de Paiement",
            field: "typePaiement",
            editor: false,
            headerFilter: "select",
            headerFilterParams: { values: ["", "livraison", "virement"] },
          },
          {
            title: "Date Enregistrement",
            field: "dateEnregistrement",
            width: 130,
            sorter: "string",
            headerFilter: "input",
          },
          { title: "N° Demande", field: "numDemande", editor: false },
        ],
      });
    },
  });
});
