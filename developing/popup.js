async function get_info() {
  return new Promise((res) => {
    chrome.storage.sync.get(["request"], (items) => {
      const info = items["request"];
      console.log(info);
      res(info.toString());
    });
  });
}

const request = document.getElementById("request");

(async () => {
    const info = await get_info();
  request.innerText = JSON.parse(info);
})();
