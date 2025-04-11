export async function deleteURL(shortcode: string): Promise<[number, string]> {
  const response = await fetch(`/shorten/${shortcode}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `shortcode=${encodeURIComponent(shortcode)}`,
  });

  let message: string = "Deleted shortcode.";
  if (response.status === 404) {
    message = "No URL found for this shortcode.";
  }
  return [response.status, message];
}
