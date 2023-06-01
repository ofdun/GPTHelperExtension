let button = document.getElementById('button');
let input = document.getElementById('API-KEY');


button.addEventListener('click', () => {
    chrome.storage.sync.set(
        { 'API-KEY': JSON.stringify(input.value) },
        () => { }
    );
});