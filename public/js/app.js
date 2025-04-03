"use strict";

import * as POST from "./actions/post.js";

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
