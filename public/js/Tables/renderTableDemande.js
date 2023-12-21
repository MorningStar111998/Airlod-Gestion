$.ajax({
  url: "/mes_demandes/table",
  type: "GET",
  success: function (data) {
    var tabledata = data;
    var billIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return "<i class='bx bx-money-withdraw'></i>";
    };

    var table = new Tabulator("#tableDemandes", {
      rowFormatter: function (row) {
        row.getElement().classList.add(); //mark rows with age greater than or equal to 18 as successful;
      },
      downloadConfig: {
        rowHeight:60,
        height: "100%",
        columnHeaders: true, //do not include column headers in downloaded table
        columnGroups: true, //do not include column groups in column headers for downloaded table
        rowGroups: true, //do not include row groups in downloaded table
        columnCalcs: true, //do not include column calcs in downloaded table
        dataTree: true, //do not include data tree in downloaded table
      },
      data: tabledata, //load row data from array
      // selectable: true,
      layout: "fitDataTable", //fit columns to width of table
      responsiveLayout: false, //hide columns that don't fit on the table
      addRowPos: "top", //when adding a new row, add it to the top of the table
      history: true, //allow undo and redo actions on the table
      pagination: true, //paginate the data
      paginationSize: 12, //allow 7 rows per page of data
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
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          titleFormatterParams: {
            rowRange: "active", //only toggle the values of the active filtered rows
          },
          hozAlign: "center",
          headerSort: false,
          download: false,
        },
        {
          title: "Générer Facture",
          formatter: billIcon,
          download: false,

          // width: 40,
          hozAlign: "center",

          cellClick: function (e, cell) {
            var curDemande = cell.getRow().getData();

            Object.entries(curDemande).forEach((field) => {
              var element = document.getElementById(field[0] + "Facture");
              console.log(field[1]);
              if (element) {
                element.value = field[1];
              }
            });

            // console.log(curDemande);

            $("#ajouter-facture-form").fadeIn();
            $(".form").css("margin-top", 20);

            $(document).mouseup(function (e) {
              var modal = $(".form");
              if (!modal.is(e.target) && modal.has(e.target).length === 0) {
                $("#ajouter-facture-form").fadeOut();
              }
            });
          },
        },

        {
          title: "N° Demande",
          field: "numDemande",
          editor: false,
        },
        {
          title: "Nom Client",
          field: "nomClient",

          formatter: function (cell, formatterParams) {
            var value = cell.getValue();
            return (
              "<span style='color:#1d4ed8; font-weight:bold;'>" +
              value +
              "</span>"
            );
          },

          editor: false,
          cellClick: function (e, cell) {
            var curDemande = cell.getRow().getData();

            Object.entries(curDemande).forEach((field) => {
              var element = document.getElementById(field[0]);
              if (element) {
                element.value = field[1];
                // console.log(field);
              }
            });

            $("#modifier-demande-form").fadeIn();
            $(".form").css("margin-top", 20);

            $(document).mouseup(function (e) {
              var modal = $(".form");
              if (!modal.is(e.target) && modal.has(e.target).length === 0) {
                $("#modifier-demande-form").fadeOut();
              }
            });
          },
        },
        {
          title: "Numéro Téléphone",
          field: "numTelephone",
          editor: false,
        },
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
            download: false,
          },
        },
        {
          title: "Étape Actuelle",
          field: "etapeActuelle",
          editor: false,
          headerFilter: "select",
          headerFilterParams: {
            values: [
              "",
              "Découvre ses besoins",
              "Conception",
              "Validation",
              "Production",
              "Livraison",
            ],
          },
        },
        { title: "Produit", field: "produit", editor: false },
        { title: "Quantité", field: "quantite", editor: false },
        { title: "Email", field: "email", editor: false, download: false },
        {
          title: "Source",
          field: "source",
          editor: false,
          headerFilter: "select",
          headerFilterParams: {
            values: [
              "",
              "Whatsapp",
              "Messenger",
              "Instagram",
              "Landing Page",
              "Site",
              "Bouche à Oreil",
            ],
          },
        },
        {
          title: "État Client",
          field: "etatClient",
          editor: false,
          headerFilter: "select",
          headerFilterParams: {
            values: [
              "",
              "Intéressé",
              "En Discussion",
              "Attente Logo",
              "Attente Confirmation",
              "Pas de Réponse",
              "Non Intéressé",
              "Design en Cours",
              "Design Validé",
              "Attente Ramassage",
              "Envoyé",
            ],
            download: false,
          },
        },
        { title: "Ville", field: "ville", editor: false },
        { title: "Adresse", field: "adresse", editor: false },
        { title: "Prix", field: "prix", editor: false },
        {
          title: "Type Paiement",
          field: "typePaiement",
          editor: false,
          headerFilter: "select",
          headerFilterParams: {
            values: ["", "Virement", "A la Livraison"],
          },
        },
        { title: "N° Facture", field: "numFacture", editor: false },
        {
          title: "Date Enregistrement",
          field: "dateEnregistrement",
          editor: false,
          download: false,
        },
        // Add more columns as needed
      ],
    });

    //functions about table
    $("#testButton").on("click", function () {
      let selectedData = table.getSelectedData(); // Get array of currently selected data.
      const lengthData = selectedData.length;
      let dataIds = [];

      for (var i = 0; i < lengthData; i++) {
        dataIds.push(selectedData[i].numDemande);
      }

      // Now, dataIds contains the values from the 'numDemande' property of selectedData.
      if (confirm("Êtes vous sûr de vouloir supprimer ces demandes ?")) {
        $.ajax({
          url: "/mes_demandes/supprimer_demandes",
          type: "DELETE",
          success: function (response) {},
        });
      }
    });

    $("#download-csv").on("click", function () {
      table.download("csv", "Liste des demandes.csv");
    });

    //trigger download of data.xlsx file
    $("#download-xlsx").on("click", function () {
      table.download("xlsx", "data.xlsx", { sheetName: "Liste des demandes" });
    });

    //trigger download of data.pdf file
    $("#download-pdf").on("click", function () {
      table.download("pdf", "data.pdf", {
        orientation: "landscape", //set page orientation to portrait
        title: "Liste des demandes", //add title to report
      });
    });
  },
});
