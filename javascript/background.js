console.log("background.js running...");


// VARIABLES
// User not logged in upon restart
let loginEmail = null;
let loginReturnToken = null;

const blacklist = [
  "https://www.instagram.com/",
  "https://www.facebook.com/"
];

let baseUrl = chrome.runtime.getURL('/');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(tab);
  if (!loginEmail && !loginReturnToken) {
    chrome.browserAction.setPopup({
      "tabId": tabId,
      "popup": "../views/popup_login.html"
    });
  } else {
    chrome.browserAction.setPopup({
      "tabId": tabId,
      "popup": "../views/popup_blacklisted.html"
    });
  }
});

// Set dynamic popup html files

// function setPopupHTML() {
//   if (loginEmail !== null && loginReturnToken !== null) {
//     // User is logged in
//     chrome.browserAction.setPopup({
//       popup: 'views/popup_blacklisted.html'
//     });
//   }
//   else {
//     chrome.browserAction.setPopup({
//       popup: 'views/popup_login.html'
//     });
//   };
// };

// CALLED FROM POPUP.JS

function getBlacklists(loginReturnToken) {
  // FIX API FIRST
};

function getFlashcards(loginReturnToken) {
  // FIX API FIRST
};

function getLoginReturnToken(emailInput) {

  let endpoint = "http://localhost:3000/api/v1/login_return_token";
  let myInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': `${emailInput.value}`
    }
  };

  fetch(endpoint, myInit)
    .then(response => response.json())
    .then((data) => {
      setLoginEmail(emailInput);
      console.log(`Login email set successfully: ${loginEmail}`);
      loginReturnToken = data.message;
      console.log(`Login return token set successfully: ${loginReturnToken}`);
      console.log(`User is now signed in`)

      // Get blacklists

      // Get flashcards

    });
};

function setLoginEmail(emailInput) {
  loginEmail = emailInput.value;
};



// MESSAGE PASSING
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {

    if (message.request == "blacklist") {
      // Check url agains blacklist within background.js
      blacklist.forEach((website) => {
        if (website == sender.url) {
          chrome.tabs.sendMessage(sender.tab.id, { response: "blacklisted", baseUrl: baseUrl });
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








