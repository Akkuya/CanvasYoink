let count = 0;
let storedFrame = null;

function logURL(requestDetails) {
  let url = requestDetails.url;
  let sanitized_url = url.slice(0, url.indexOf("a.mp4") + 5);
  sanitized_url = sanitized_url.replace("/hls", "");
  if (url.includes("seg-1-v")) {
    count = 0;
  }
  if (url.includes("seg-3-v")) {
    if (count < 2) {
      count++;
      chrome.storage.session.get(["frameId", "tabId"], (result) => {
        chrome.tabs.sendMessage(
          result.tabId,
          { type: "URL_CAPTURED", url: sanitized_url },
          { frameId: result.frameId },
        );
      });
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(logURL, {
  urls: ["*://cfvod.cap2.ovp.kaltura.com/*/hls/*"],
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "FRAME_READY") {
    // store it
    chrome.storage.session.set({
      frameId: sender.frameId,
      tabId: sender.tab.id,
    });
  }

  if (msg.type === "GET_FRAME") {
    chrome.storage.session.get(["frameId", "tabId"], (result) => {
      sendResponse(result);
    });
    return true; // 👈 critical, tells Chrome to keep the channel open for async response
  }
});
