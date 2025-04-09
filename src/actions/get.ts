import type { DatabaseResponse } from "../types.ts";

export async function getURL(
  shortcode: string,
  action: string,
): Promise<[DatabaseResponse, number, string]> {
  let path = "";
  let message = "";
  if (action === "retrieve") {
    path = `/shorten/${shortcode}`;
  } else if (action === "stats") {
    path = `/shorten/${shortcode}/stats`;
  }
  const response = await fetch(path, {
    method: "GET",
  });
  const status = response.status;
  if (status === 404) {
    message = "No URL found for this shortcode.";
  } else if (status === 200 && action === "stats") {
    message = "Access statistics retrieved for the provided shortcode.";
  } else {
    message = "Retrieved URL.";
  }
  const data = await response.json();
  return [data, status, message];
}
