const loadRulesFromStorage = async (): Promise<Record<string, string[]>> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "getRules" }, (rules) => {
      resolve(rules || {});
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const rules = await loadRulesFromStorage();

  const detectAndInteract = () => {
    const banner = rules.banners
      .map((selector) => document.querySelector(selector))
      .find((el) => el !== null) as HTMLElement | null;

    if (banner) {
      console.log("Banner detected:", banner);

      const acceptBtn = rules.accept
        .map((selector) => banner.querySelector(selector))
        .find((el) => el !== null) as HTMLElement | null;

      if (acceptBtn) {
        console.log("Clicking accept button:", acceptBtn);
        acceptBtn.click();
        chrome.runtime.sendMessage({ type: "bannerAccepted" });
        return;
      }

      const rejectBtn = rules.reject
        .map((selector) => banner.querySelector(selector))
        .find((el) => el !== null) as HTMLElement | null;

      if (rejectBtn) {
        console.log("Clicking reject button:", rejectBtn);
        rejectBtn.click();
        chrome.runtime.sendMessage({ type: "bannerRejected" });
        return;
      }
    }
    chrome.runtime.sendMessage({ type: "bannerNotHandled" });
  };

  detectAndInteract();
});
