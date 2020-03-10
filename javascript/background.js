console.log("background.js running...");

// VARIABLES

let loginEmail = null;
let loginReturnToken = null;

const blacklist = [
  "https://www.instagram.com/",
  "https://www.facebook.com/"
];

let baseUrl = chrome.runtime.getURL('/');

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


// CALLED FROM POPUP.JS

function getBlacklists(loginReturnToken) {



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
      loginReturnToken = data.message;
      console.log(`Login return token set successfully...`);
      // Once login return token received get blacklists
    });
};





//Listening to each tab being openened and firing callback function
// when triggered by conditions
// chrome.webNavigation.onCommitted.addListener(function(event) {

//   console.log(event);
//   // WORKING
//   // Sending message directly to extension.js
//   // chrome.runtime.sendMessage("ginifbbapdgbbglelocagabffednffek", {status: "insertFrame"});

// }, { url: [{hostSuffix: 'instagram.com'}] });








