$(document).ready(function () {
  $.ajax({
    url: "/mes_factures/table",
    type: "GET",
    success: function (data) {
      var tabledata = data;

      var table = new Tabulator("#tableFactures", {
        data: tabledata,
        layout: "fitColumns",
        responsiveLayout: "hide",
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

          { title: "N° Facture", field: "numFacture", editor: false },
          {
            title: "Prix",
            field: "prix",
            editor: true,
          },
          {
            title: "Quantité",
            field: "quantite",
            width: 95,
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
          },
          { title: "N° Demande", field: "numDemande", editor: false },
        ],
      });
    },
  });
});
