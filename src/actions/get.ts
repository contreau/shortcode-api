import type { DatabaseResponse } from "../types.ts";
import { statusMessages } from "../helpers.ts";

export async function getURL(
  shortcode: string,
  action: string,
): Promise<[DatabaseResponse, number, string]> {
  let path = "";
  if (action === "retrieve") {
    path = `/shorten/${shortcode}`;
  } else if (action === "stats") {
    path = `/shorten/${shortcode}/stats`;
  }
  const response = await fetch(path, {
    method: "GET",
  });
  const status = response.status;
  const data = await response.json();
  const message = statusMessages.get(status) as string;
  return [data, status, message];
}
