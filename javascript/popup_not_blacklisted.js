let backgroundScript = chrome.extension.getBackgroundPage();

let websiteName = document.getElementById('website-name');

let linkLogout = document.getElementById('link-logout');

let btnYes = document.getElementById('btn-yes');
let btnNo = document.getElementById('btn-no');

chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
  websiteName.innerText = backgroundScript.getWebsiteName(tab[0].url);
});

btnYes.addEventListener("click", function() {
  backgroundScript.addBlacklist();
  window.close();
});

btnNo.addEventListener("click", function() {
  window.close();
});

linkLogout.addEventListener('click', function(event) {
  backgroundScript.logout();
  window.close();
});
