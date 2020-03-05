console.log("background.js running...");

// Fetch blacklist with API
const blacklist = [
  "https://www.instagram.com/",
  "https://www.facebook.com/"
];


// Start listening for messages
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {

    if (message.request == "blacklist") {
      // Check url agains blacklist within background.js
      blacklist.forEach((website) => {
        if (website == sender.url) {
          chrome.tabs.sendMessage(sender.tab.id, { response: "blacklisted", flashcardViewUrl: `${chrome.runtime.getURL('views/flashcard.html')}` });
        };
      });
    }
    // Listen for other requests from content.js
    else {
      chrome.tabs.sendMessage(sender.tab.id, { response: "not blacklisted" });
    }
  });


//Listening to each tab being openened and firing callback function
// when triggered by conditions
// chrome.webNavigation.onCommitted.addListener(function(event) {

//   console.log(event);
//   // WORKING
//   // Sending message directly to extension.js
//   // chrome.runtime.sendMessage("ginifbbapdgbbglelocagabffednffek", {status: "insertFrame"});

// }, { url: [{hostSuffix: 'instagram.com'}] });

console.log(chrome.runtime.getURL('views/flashcard.html'));





