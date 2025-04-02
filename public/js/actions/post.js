"use strict";

// ** POST ACTION
/** @param {string} endpoint @param {string} url
 * @returns {Promise<[PostResponse, number]>}
 */
export async function postURL(endpoint, url) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}`,
  });
  const status = response.status;
  const data = await response.json();
  return [data, status];
}

// ** ELEMENT VARIABLES
export const shortcodeForm = /** @type {HTMLFormElement} */ (
  document.querySelector('form[method="post"]')
);

export const responseContainer = /** @type {HTMLDivElement} */ (
  document.querySelector("section.create div.response-contents")
);
export const responseItemSpans = /** @type {HTMLSpanElement[]} */ (
  Array.from(responseContainer?.children[0].children)
).filter((el) => el.tagName === "SPAN");

export const shortcodeSubmitButton = /** @type {HTMLButtonElement} */ (
  document.querySelector('form[method="post"] input[type="submit"]')
);

export const statusCodeSpan = /** @type {HTMLSpanElement } */ (
  document.querySelector("span.status-code")
);
