$.ajax({
  url: "/mes_demandes/table",
  type: "GET",
  success: function (data) {
    var tabledata = data;
    const dataTableFormat = tabledata.map((obj) => Object.values(obj));

    $("#tableDemandes").DataTable({
      columns: [
        { title: "N° Demande", field: "numDemande", editor: false },
        { title: "Nom Client", field: "nomClient", editor: false },
        { title: "Numéro Téléphone", field: "numTelephone", editor: false },
        { title: "Email", field: "email", editor: false },
        {
          title: "Type Client",
          field: "typeClient",
          editor: false,
          headerFilter: "select",
          headerFilterParams: {
            values: [
              "",
              "Pressé",
              "Instruit",
              "Indecis",
              "Agressif",
              "Négociateur",
            ],
          },
        },
        { title: "Étape Actuelle", field: "etapeActuelle", editor: false },
        { title: "Produit", field: "produit", editor: false },
        { title: "Quantité", field: "quantite", editor: false },
        { title: "Prix", field: "prix", editor: false },
        { title: "État Client", field: "etatClient", editor: false },
        { title: "Ville", field: "ville", editor: false },
        { title: "Adresse", field: "adresse", width: 100, editor: false },
        { title: "Source", field: "source", editor: false },
        { title: "Type Paiement", field: "typePaiement", editor: false },
        { title: "N° Facture", field: "numFacture", editor: false },
        {
          title: "Date Enregistrement",
          field: "dateEnregistrement",
          editor: false,
        },
      ],
      data: dataTableFormat,
    });

  },
});
