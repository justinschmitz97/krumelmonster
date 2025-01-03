const loadRules = async () => {
  const files = [
    chrome.runtime.getURL("rules/banners.txt"),
    chrome.runtime.getURL("rules/accept-essential.txt"),
    chrome.runtime.getURL("rules/reject-nonessential.txt"),
  ];

  const rules: Record<string, string[]> = {
    banners: [],
    accept: [],
    reject: [],
  };

  try {
    // Fetch and load each rule file dynamically
    for (const [index, fileURL] of files.entries()) {
      const response = await fetch(fileURL);
      const content = await response.text();
      const key = Object.keys(rules)[index]; // Match rules keys to files
      rules[key] = content.split("\n").filter((line) => line.trim() !== "");
    }

    // Store rules in Chrome storage
    chrome.storage.local.set({ cookieRules: rules });
    console.log("Rules successfully loaded and stored:", rules);
  } catch (error) {
    console.error("Failed to load or parse rule files:", error);
  }
};

// Run the rule loader on installation
chrome.runtime.onInstalled.addListener(() => {
  loadRules();
});

// Provide rules to content scripts on request
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getRules") {
    chrome.storage.local.get("cookieRules", (data) => {
      sendResponse(data.cookieRules || {});
    });
    return true; // Indicates an async sendResponse is being used
  }
});
