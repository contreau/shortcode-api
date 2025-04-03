import type { PostResponse } from "../types.ts";

export async function postURL(
  endpoint: string,
  url: string,
): Promise<[PostResponse | null, number, string]> {
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
  const message = statusMessages.get(status) as string;
  return [data, status, message];
}
