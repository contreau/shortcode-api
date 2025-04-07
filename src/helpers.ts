import { UI_state } from "./components/store";

export function validateUrlInput(event: Event, method: string, url: string) {
  if (method !== "post") {
    return true;
  }
  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  if (!isValidURL(url)) {
    event.preventDefault();
    UI_state.invalidUrlErrorVisible = true;
    setTimeout(() => {
      UI_state.invalidUrlErrorVisible = false;
    }, 3000);
  }
}

export const statusMessages = new Map([
  [200, "Retrieved URL."],
  [201, "Created shortcode."],
  [204, "Deleted shortcode."],
  [400, "A shortcode for this URL already exists."],
  [404, "No URL found for this shortcode."],
  [500, "error"],
]);
