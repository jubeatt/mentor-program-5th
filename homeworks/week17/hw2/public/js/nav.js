document.querySelector(".navigation__button").addEventListener("click", () => {
  const list = document.querySelector(".navigation__list");
  if (list.getAttribute("data-state") === "close") {
    list.setAttribute("data-state", "open");
    list.style.display = "block";
  } else {
    list.setAttribute("data-state", "close");
    list.style.display = "none";
  }
});
