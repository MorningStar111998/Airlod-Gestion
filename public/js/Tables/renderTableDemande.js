$(document).ready(function () {
  $.ajax({
    url: "/mes_demandes/table",
    type: "GET",
    success: function (data) {
      var tabledata = data;

      var table = new Tabulator("#tableDemandes", {
        data: tabledata, //load row data from array
        layout: "fitDataStretch", //fit columns to width of table
        responsiveLayout: "responsive", //hide columns that don't fit on the table
        addRowPos: "top", //when adding a new row, add it to the top of the table
        history: true, //allow undo and redo actions on the table
        pagination: "local", //paginate the data
        paginationSize: 14, //allow 7 rows per page of data
        paginationCounter: "rows", //display count of paginated rows in footer
        movableColumns: false, //allow column order to be changed
        initialSort: [
          //set the initial sort order of the data
          { column: "name", dir: "asc" },
        ],
        columnDefaults: {
          tooltip: true, //show tool tips on cells
        },
        columns: [
          { title: "N° Demande", field: "numDemande", editor: false },
          { title: "Nom Client", field: "nomClient", editor: false },
          { title: "Numéro Téléphone", field: "numTelephone", editor: false },
          { title: "Type Client", field: "typeClient", editor: false },
          { title: "Étape Actuelle", field: "etapeActuelle", editor: false },
          { title: "Produit", field: "produit", editor: false },
          { title: "Quantité", field: "quantite", editor: false },
          { title: "Email", field: "email", editor: false },
          { title: "Source", field: "source", editor: false },
          { title: "État Client", field: "etatClient", editor: false },
          { title: "Ville", field: "ville", editor: false },
          { title: "Adresse", field: "adresse", editor: false },
          { title: "Prix", field: "prix", editor: false },
          { title: "Type Paiement", field: "typePaiement", editor: false },
          { title: "N° Facture", field: "numFacture", editor: false },
          {
            title: "Date Enregistrement",
            field: "dateEnregistrement",
            editor: false,
          },
          // Add more columns as needed
        ],
      });
    },
  });
});
