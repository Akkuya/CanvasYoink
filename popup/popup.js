chrome.runtime.sendMessage({ type: "GET_FRAME" }, (response) => {
  if (!response) {
    document.getElementById("count").textContent = "reload page";
    return;
  }
  chrome.scripting.executeScript(
    {
      target: { tabId: response.tabId, frameIds: [response.frameId] },
      func: () => {
        return [...document.querySelectorAll(".yoink-btn")].map((a) => a.href);
      },
    },
    (results) => {
      const urls = results[0].result;
      document.getElementById("count").textContent = urls.length;
      const list = document.getElementById("url-list");
      urls.forEach((url) => {
        const div = document.createElement("div");
        div.className = "url";
        div.textContent = url;
        list.appendChild(div);
      });
    },
  );
});
