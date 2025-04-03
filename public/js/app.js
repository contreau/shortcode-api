"use strict";

import * as POST from "./actions/post.js";

// ** Handler for toggling '.selected' of action buttons and their associated <section> display
const actionButtons = document.querySelectorAll(".action-items button");
actionButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // remove current selection
    document.querySelector("button.selected")?.classList.remove("selected");
    document.querySelector(`section:not(section.hide)`)?.classList.add("hide");

    // highlight new selection
    const button = /** @type {HTMLButtonElement} */ (event.target);
    const actionClass = button.dataset.action;
    button.classList.add("selected");
    document.querySelector(`section.${actionClass}`)?.classList.remove("hide");
  });
});

// ** Validate URL client-side
/**
 * @param {string} url
 * @returns {boolean}
 */
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// ** MESSAGE INDICATING INVALID URL
/** @type {HTMLParagraphElement | null} */
const invalidUrlMessage = document.querySelector("p.invalid-url-message");

// ** CSS CLASS MAP FOR STATUS CODES
/** @type {Map<number, string>}  */
const statusMap = new Map([
  [200, "success"],
  [201, "success"],
  [204, "success"],
  [400, "error"],
  [404, "error"],
]);

// ** POST ACTION EVENT LISTENERS
// * FORM INPUT
POST.shortcodeForm?.addEventListener("submit", async (event) => {
  event?.preventDefault();
  const input = /** @type {HTMLInputElement} */ (
    POST.shortcodeForm?.elements[0]
  );
  let [data, status, message] = await POST.postURL("/shorten", input.value);
  console.log(data);
  POST.statusLabel.classList.remove("success", "error");
  POST.responseContainer.classList.remove("visible");

  if (statusMap.get(status) === "error") {
    POST.statusLabel.classList.add(
      /** @type {string} */ (statusMap.get(status)),
    );
    POST.statusLabel.textContent = `${status}`;
    POST.statusMessage.textContent = /** @type {string} */ (message);
    POST.statusMessage.classList.remove("hide");
    POST.statusResponse.classList.add("visible");
  } else {
    data = /** @type {PostResponse} */ (data);
    for (let i = 0; i < Object.keys(data).length; i++) {
      POST.responseItemSpans[i].textContent = /** @type {string} */ (
        data[`${POST.responseItemSpans[i].id}`]
      );
    }
    POST.statusLabel.classList.add(
      /** @type {string} */ (statusMap.get(status)),
    );
    POST.statusLabel.textContent = `${status}`;
    POST.statusMessage.textContent = /** @type {string} */ (message);
    POST.statusResponse.classList.add("visible");
    POST.responseContainer.classList.add("visible");
  }

  input.value = "";
  input.focus();
});
// * SUBMIT BUTTON
POST.shortcodeSubmitButton?.addEventListener("click", (event) => {
  const submitButton = /** @type {HTMLInputElement} */ (event.target);
  const urlInput = /** @type {HTMLInputElement} */ (
    submitButton?.form?.elements[0]
  );
  if (!isValidURL(urlInput.value)) {
    event.preventDefault();
    invalidUrlMessage?.classList.add("visible");
    setTimeout(() => {
      invalidUrlMessage?.classList.remove("visible");
    }, 3000);
  }
});
