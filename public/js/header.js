let btn = document.querySelector(".sidebar-btn");
let sidebar = document.querySelector(".sidebar");
let subMenuToggles = document.querySelectorAll(".toggle-menu");
let subMenus = document.querySelectorAll(".sub-menu");
let chevrons = document.querySelectorAll(".chevron");

btn.onclick = function () {
  const isSubMenuRolled = Array.from(subMenus).some((subMenu) =>
    subMenu.classList.contains("roll")
  );

  if (sidebar.classList.contains("active") && isSubMenuRolled) {
    sidebar.classList.remove("active");
    subMenus.forEach((subMenu) => subMenu.classList.remove("roll"));
    chevrons.forEach((chevron) => chevron.classList.remove("rotated"));
  } else {
    sidebar.classList.toggle("active");
  }
};

subMenuToggles.forEach((subMenuToggle, index) => {
  subMenuToggle.onclick = () => {
    const isSidebarActive = sidebar.classList.contains("active");

    if (!isSidebarActive) {
      sidebar.classList.toggle("active");
    }

    subMenus[index].classList.toggle("roll");
    chevrons[index].classList.toggle("rotated");
  };
});


