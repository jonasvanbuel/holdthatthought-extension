console.log("popup.js running...");

// Load background script
let backgroundScript = chrome.extension.getBackgroundPage();

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener("click", function() {
  const emailInput = document.getElementById('emailInput');
  backgroundScript.setLoginEmail(emailInput);
  backgroundScript.getLoginReturnToken(emailInput);

  // Close popup
  window.close();

  // Force re-evaluate popup view from background.js
});







// SENDING REQUEST FROM EXTENSION TO CONTENT SCRIPT
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello from extension.js"});
// });

// // SENDING message from extionsion to current active tab console
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello from flashcard.js"});
// });

// // LISTENING FOR MESSAGE FROM CONTENT SCRIPT
// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
//     console.log(message);
//   });
