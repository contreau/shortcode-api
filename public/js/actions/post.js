"use strict";

// ** POST ACTION
/** @param {string} endpoint @param {string} url
 * @returns {Promise<[PostResponse | null, number, string]>}
 */
export async function postURL(endpoint, url) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}`,
  });

  const statusMessages = new Map([
    [200, "Retrieved shortcode."],
    [201, "Created shortcode."],
    [204, "Deleted shortcode."],
    [400, "A shortcode for this URL already exists."],
    [404, "Shortcode not found."],
    [500, "error"],
  ]);

  const status = response.status;
  const data = await response.json();
  const message = /** @type {string} */ (statusMessages.get(status));
  return [data, status, message];
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

export const statusResponse = /** @type {Element} */ (
  document.querySelector("code.response-status")
);

export const statusLabel = /** @type {HTMLSpanElement } */ (
  document.querySelector("span.status-code")
);

export const statusMessage = /** @type {HTMLParagraphElement} */ (
  document.querySelector("p.status-message")
);
