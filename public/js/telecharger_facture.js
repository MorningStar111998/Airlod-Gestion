$("#facture-form-button").on("click", function () {
  var element = document.getElementById("telecharger-facture");
  var desiredWidth = 1600;
  var desiredHeight = (9 / 16) * desiredWidth;
  var scale = desiredWidth / element.offsetWidth;

  html2pdf(element, {
    margin: 10,
    filename: "telecharger-facture.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: scale },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    
  });
    html2canvas(element).then(function (canvas) {
      element.appendChild(canvas);
    });
});
