console.log("Content script initialized: Auto Functional Cookies");

// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
  const COOKIE_BANNER_SELECTORS = [
    ".cookie-banner", // General classes
    "#cookie-consent", // Specific IDs
    "div[data-cookie]", // Attribute-based match
  ];

  const ESSENTIAL_BUTTON_SELECTORS = [
    ".accept-essential", // Button classes for essential cookies
    ".btn-functional", // Another example
    `button:contains("Necessary")`, // Text-based detection
  ];

  const detectAndInteract = () => {
    // Step 1: Detect banner
    const banner = COOKIE_BANNER_SELECTORS.map((selector) =>
      document.querySelector(selector)
    ).find((el) => el !== null) as HTMLElement | null; // Ensure the result is a DOM element or null

    if (banner) {
      console.log("Cookie banner detected:", banner);

      // Step 2: Find the appropriate button
      const essentialButton = ESSENTIAL_BUTTON_SELECTORS.map((selector) =>
        banner.querySelector(selector)
      ).find((el) => el !== null) as HTMLElement | null; // Same typing fix for buttons

      if (essentialButton) {
        console.log("Accepting essential cookies via", essentialButton);
        essentialButton.click();

        // Log success
        chrome.runtime.sendMessage({
          type: "bannerAccepted",
          details: { url: window.location.href },
        });
        return;
      } else {
        console.warn("No functional cookie button found!");
      }
    } else {
      console.warn("No cookie banner detected!");
    }

    // Log failure if no banner or button is found
    chrome.runtime.sendMessage({
      type: "bannerNotHandled",
      details: { url: window.location.href },
    });
  };

  // Execute the above logic
  detectAndInteract();
});
