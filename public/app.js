"use strict";

// ** Handler for toggling '.selected' of action buttons and their associated <section> display
const actionButtons = document.querySelectorAll(".action-items button");
actionButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // remove current selection
    document.querySelector("button.selected").classList.remove("selected");
    document.querySelector(`section:not(section.hide)`).classList.add("hide");

    // highlight new selection
    const actionClass = event.target.dataset.action;
    event.target.classList.add("selected");
    document.querySelector(`section.${actionClass}`).classList.remove("hide");
  });
});
