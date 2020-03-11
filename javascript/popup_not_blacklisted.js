console.log("popup.js running...");

// Load background script
let backgroundScript = chrome.extension.getBackgroundPage();

let addBlacklistBtn = document.getElementById('yesBtn');
let noBtn = document.getElementById('noBtn');

addBlacklistBtn.addEventListener("click", function() {
  backgroundScript.addBlacklist();
  window.close();
});

noBtn.addEventListener("click", function() {
  window.close();
});
