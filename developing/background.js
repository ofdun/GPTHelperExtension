chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "myContextMenu",
      title: "My Extension",
      contexts: ["selection"],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "myContextMenu") {
      const selectedText = info.selectionText;
      chrome.tabs.sendMessage(tab.id, { text: selectedText });
    }
  });
  