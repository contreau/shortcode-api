"use strict";

// ** REST ACTIONS

// ** POST
/** @param {string} endpoint @param {string} long_url */
export async function postURL(endpoint, long_url) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `long_url=${encodeURIComponent(long_url)}`,
  });
  const data = await response.json();
  console.log(data);
}

/** @param {string} endpoint */
async function retrieveURL(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
}
