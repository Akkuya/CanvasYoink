console.log("CanvasYoink content.js injected!");
chrome.runtime.sendMessage({ type: "FRAME_READY", href: location.href });
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "URL_CAPTURED") {
    showDownloadButton(msg.url);
  }
});
function waitForElement(selector, callback) {
  const el = document.querySelector(selector);
  if (el) return callback(el);

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function showDownloadButton(url) {
  console.log("Running");
  waitForElement(".stat_data", (target) => {
    const btn = document.createElement("a");
    btn.textContent = `⬇ Download Lecture`;
    btn.href = url;
    btn.className = "yoink-btn";
    btn.download = "lecture.mp4";
    btn.target = "_blank";
    btn.style.cursor = "pointer";
    btn.style.cssText = `
  margin-left: 10px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #6e48aa, #9d50bb);
  color: white;
  border-radius: 999px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
  vertical-align: middle;
  box-shadow: 0 2px 6px rgba(110, 72, 170, 0.4);
  transition: opacity 0.2s;
  white-space: nowrap;
  display: inline-block;
`;
    btn.onmouseover = () => (btn.style.opacity = "0.85");
    btn.onmouseleave = () => (btn.style.opacity = "1");
    target.style.whiteSpace = "nowrap";
    target.appendChild(btn);
    target.style.display = "flex";
    target.style.alignItems = "center";
    target.style.gap = "8px";
  });
}
