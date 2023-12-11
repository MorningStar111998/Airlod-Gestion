const villeslist = [
  "Agadir",
  "Ben Guerir",
  "Béni Mellal",
  "Berkane",
  "Casablanca",
  "El Jadida",
  "Essaouira",
  "Errachidia",
  "Fès",
  "Guelmim",
  "Kénitra",
  "Khouribga",
  "Ksar El Kebir",
  "Laayoune",
  "Larache",
  "Marrakech",
  "Meknès",
  "Mohammédia",
  "Nador",
  "Ouarzazate",
  "Oujda",
  "Rabat",
  "Salé",
  "Safi",
  "Settat",
  "Tanger",
  "Taourirt",
  "Taza",
  "Tétouan",
  "Tiznit",
];

// Get the input and datalist elements
const villeInput = document.getElementById("villeInput");
const villes = document.getElementById("villes");

// Dynamically populate the datalist options
villeslist.forEach((ville) => {
  const option = document.createElement("option");
  option.value = ville;
  option.text = ville;
  villes.appendChild(option);
});

// Optionally, you can add an event listener to update the list dynamically on input change
villeInput.addEventListener("input", function () {
  // Implement dynamic updates here if needed
  // For example, you can fetch suggestions based on user input
});
