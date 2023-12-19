$(document).ready(function () {
  $.ajax({
    url: "/mes_factures/table",
    type: "GET",
    success: function (data) {
      var tabledata = data;

      const dataTableFormat = tabledata.map((obj) => Object.values(obj));

      $("#tableFactures").DataTable({
        columns: [
          { title: "N° Facture", field: "numFacture", editor: false },
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
            title: "Produit",
            field: "produit",
            width: 100,
            editor: false,
          },
          {
            title: "Quantité",
            field: "quantite",
            width: 95,
            editor: false,
            hozAlign: "center",
          },
          {
            title: "Prix",
            field: "prix",
            editor: true,
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
        ],
        data: dataTableFormat,
      });
    },
  });
});
