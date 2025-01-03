chrome.runtime.onInstalled.addListener(() => {
  // Create or schedule a recurring alarm
  chrome.alarms.create("ruleUpdate", { periodInMinutes: 1440 }); // Once per day
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "ruleUpdate") {
    fetchRuleUpdates();
  }
});

// Fetch updated rules and store them
const fetchRuleUpdates = async () => {
  try {
    const response = await fetch("https://example.com/cookie-rules.json");
    if (response.ok) {
      const rules = await response.json();
      await chrome.storage.local.set({ cookieRules: rules });
      console.log("Successfully updated rules.");
    }
  } catch (error) {
    console.error("Failed to update rules:", error);
  }
};

// Provide rules to content scripts on request
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getRules") {
    chrome.storage.local.get("cookieRules", (data) => {
      sendResponse(data.cookieRules || []);
    });
    return true; // Indicates async sendResponse
  }
});
