chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askGPT",
    title: "Ask GPT",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selected_text = info.selectionText;
  if (info.menuItemId === "askGPT") {
    chrome.tabs.create({
      url: `popup.html`,
    });
  }
});