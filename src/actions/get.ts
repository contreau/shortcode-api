import type { DatabaseResponse } from "../types.ts";
import { statusMessages } from "../helpers.ts";

export async function getURL(
  shortcode: string,
): Promise<[DatabaseResponse, number, string]> {
  const response = await fetch(`/shorten/${shortcode}`, {
    method: "GET",
  });

  const status = response.status;
  const data = await response.json();
  const message = statusMessages.get(status) as string;
  return [data, status, message];
}
