"use strict";

/** @param {string} endpoint */
export async function retrieveURL(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
}
