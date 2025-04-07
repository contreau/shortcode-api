import type { DatabaseResponse } from "../types.ts";
import { statusMessages } from "../helpers.ts";

export async function postURL(
  url: string,
): Promise<[DatabaseResponse | null, number, string]> {
  const response = await fetch("/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}`,
  });

  const status = response.status;
  const data = await response.json();
  const message = statusMessages.get(status) as string;
  return [data, status, message];
}
