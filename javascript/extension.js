console.log("Hello from extension.js");

// SENDING REQUEST FROM EXTENSION TO CONTENT SCRIPT
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello from extension.js"});
});

// export and import?



// // SENDING message from extionsion to current active tab console
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello from flashcard.js"});
// });

// // LISTENING FOR MESSAGE FROM CONTENT SCRIPT
// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
//     console.log(message);
//   });
