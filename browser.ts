/**
 * Open a web page with the appropriate browser.
 * @module
 */

/**
 * Get a browser open command based on the os
 * @returns the string for the command to call
 */
function getBrowserCmd(): string {
   switch (Deno.build.os) {
      case "windows":
         return "explorer.exe";
      case "darwin":
         return "open";
      case "linux":
         if (Deno.env.get("WSL_DISTRO_NAME")) {
            // is WSL
            return "explorer.exe";
         } else {
            return "xdg-open";
         }
      default:
         return "Unknown os" 
    }
}

/**
 * Opens a website in the default browser
 * @param url  - the url to be opened in the browser
 * @example await openWebsite('https://Deno.com')
 */
export function openWebsite(url: string): Deno.CommandOutput {
   return new Deno.Command(getBrowserCmd(), 
   { args: [url] }).outputSync();
}
