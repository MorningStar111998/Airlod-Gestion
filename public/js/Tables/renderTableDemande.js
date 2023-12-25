$.ajax({
  url: "/mes_demandes/table",
  type: "GET",
  success: function (data) {
    var tabledata = data;
    var billIcon = function (cell, formatterParams, onRendered) {
      //plain text value
      return "<i style='color:#0cd608;' class='bx bx-money-withdraw'></i>";
    };

    var fieldEl = document.getElementById("filter-field");
    var typeEl = document.getElementById("filter-type");
    var valueEl = document.getElementById("filter-value");
    var tableFilters = $("#tableDemandes input").toArray();

    //Custom filter example
    function customFilter(data) {
      return data.car && data.rating < 3;
    }

    //Trigger setFilter function with correct parameters
    function updateFilter() {
      var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
      var typeVal = typeEl.options[typeEl.selectedIndex].value;

      var filter = filterVal == "function" ? customFilter : filterVal;

      if (filterVal == "function") {
        typeEl.disabled = true;
        valueEl.disabled = true;
      } else {
        typeEl.disabled = false;
        valueEl.disabled = false;
      }

      if (filterVal) {
        table.setFilter(filter, typeVal, valueEl.value);
      }
    }

    //Update filters on value change
    document
      .getElementById("filter-field")
      .addEventListener("change", updateFilter);
    document
      .getElementById("filter-type")
      .addEventListener("change", updateFilter);
    document
      .getElementById("filter-value")
      .addEventListener("keyup", updateFilter);

    document
      .getElementById("filter-clear")
      .addEventListener("click", function () {
        fieldEl.value = "";
        typeEl.value = "like";
        valueEl.value = "";
        tableFilters.forEach((tableFilter) => {
          tableFilter.value = "";
        });

        table.clearFilter(true);
      });

    var table = new Tabulator("#tableDemandes", {
      rowFormatter: function (row) {
        row.getElement().classList.add(); //mark rows with age greater than or equal to 18 as successful;
      },
      downloadRowRange: "active",
      downloadConfig: {
        rowHeight: 60,
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
      paginationSize: 10, //allow 7 rows per page of data
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
          width: 30,
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

            // Lorsqu'on clique sur la cellule, le formilaire d'ajout de facture apparaît

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
          hozAlign: "center",
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
          hozAlign: "center",
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
              " ",
              "Découvre ses besoins",
              "Conception",
              "Validation",
              "Production",
              "Livraison",
            ],
          },
        },
        {
          title: "Produit",
          field: "produit",
          editor: false,
        },
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
        {
          title: "Ville",
          field: "ville",
          editor: false,
        },
        {
          title: "Adresse",
          field: "adresse",
          editor: false,
        },
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
    $("#deleteButton").on("click", function () {
      let selectedData = table.getSelectedData(); // Get array of currently selected data.
      const lengthData = selectedData.length;
      let dataIds = [];

      for (var i = 0; i < lengthData; i++) {
        dataIds.push(selectedData[i].numDemande);
      }

      if (dataIds.length < 1) {
        $("#customText").text("Vous n'avez sélectionné aucune demande!");
        $("#customMessage").fadeIn();

        $(document).mouseup(function (e) {
          var customMessage = $("#customMessage");
          if (
            !customMessage.is(e.target) &&
            customMessage.has(e.target).length === 0
          ) {
            customMessage.fadeOut();
          }
        });

        return false;
      }
      $.ajax({
        url: "/mes_demandes/demanderAuth",
        type: "GET",
        success: function (response) {
          if (response == "SuperAdmin") {
            // Now, dataIds contains the values from the 'numDemande' property of selectedData.
            if (confirm("Êtes vous sûr de vouloir supprimer ces demandes ?")) {
              $.ajax({
                url: "/mes_demandes/supprimer_demandes",
                type: "DELETE",
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({ ids: dataIds }),
                success: function (response) {
                  console.log(
                    response.message +
                      "/n Number of rows deleted : " +
                      response.affectedRows
                  );
                },
              });
            }
          } else {
            alert("Vous n'êtes pas autorisés à effectuer cette action");
          }
        },
      });
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

$("#customMessage").textContent = "You have not selected any request!";
$("#customMessage").fadeIn();

$(document).mouseup(function (e) {
  var modal = $(".hidden");
  if (!modal.is(e.target) && modal.has(e.target).length === 0) {
    $("#customMessage").fadeOut();
  }
});
