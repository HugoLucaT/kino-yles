import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success" | "multiError",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * Formats date and time into a readable string.
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The (ET) formatted date and time string.
 */
export function formatDateTime(dateString: string): string {
  const dateOBJ = new Date(dateString);

  const date = dateOBJ.toLocaleString("et-ET", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = dateOBJ.toLocaleString("et-ET", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const formatedTxt = "Kell: " + time + ", " + date;
  return formatedTxt;
}
