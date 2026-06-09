export function getGoogleSheetsUrl() {
  const url =
    process.env.NEWSLETTER_URL ||
    process.env.CONTACT_URL ||
    process.env.NEXT_PUBLIC_NEWSLETTER_URL ||
    "";

  if (!url || url === "your_script_url_here") {
    return "";
  }

  return url;
}
