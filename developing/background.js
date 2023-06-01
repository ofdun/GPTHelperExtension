chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askGPT",
    title: "Ask GPT",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selected_text = info.selectionText;
  save_to_storage(selected_text);
  if (info.menuItemId === "askGPT") {
    chrome.tabs.create({
      url: `site/index.html`,
    });
  };
});

function save_to_storage(info) {
  chrome.storage.sync.set(
    {"request": JSON.stringify(info)},
    () => { }
  );
}