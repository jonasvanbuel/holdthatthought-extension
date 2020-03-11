console.log("background.js running...");

// VARIABLES
// User not logged in upon restart
// let loginEmail = null;
let loginEmail = "jonas.vanbuel@gmail.com";
// let loginReturnToken = null;
let loginReturnToken = "D8G-b_VuKydHzU7_7D4v";

const baseUrl = chrome.runtime.getURL('/');

let blacklistsArray = null;


function setPopupViews(tabArray) {
  console.log(`tab_id: ${tabArray.id}`);
  if (loginEmail && loginReturnToken) {

    // HARDCODED
    let blacklisted = false;

    if (blacklisted == true) {
      console.log("Popup view set to popup_blacklisted.html...");
      chrome.browserAction.setPopup({
        "tabId": tabArray.id,
        "popup": "../views/popup_blacklisted.html"
      });
    } else {
      console.log("Popup view set to popup_not_blacklisted.html...");
      chrome.browserAction.setPopup({
        "tabId": tabArray.id,
        "popup": "../views/popup_not_blacklisted.html"
      });
    };
  } else {
      console.log("Popup view set to popup_login.html...");
      chrome.browserAction.setPopup({
        "tabId": tabArray.id,
        "popup": "../views/popup_login.html"
      });
  };
};


// Evaluate popup view for every tab update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(tab);
  setPopupViews(tab);
});


function getFlashcards() {
  // TO DO!!!
};

function getBlacklists() {

  let endpoint = "http://localhost:3000/api/v1/blacklists";
  let myInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': `${loginEmail}`,
      'X-User-Token': `${loginReturnToken}`
    }
  };

  fetch(endpoint, myInit)
    .then(response => response.json())
    .then((data) => {
      console.log("Blacklists received...");
      blacklistsArray = addQueryToBlacklists(data);;
    });
};

function addBlacklist() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabArray) {

    let blacklistUrl = tabArray[0].url;
    console.log(`blacklistUrl: ${blacklistUrl}`);

    let endpoint = "http://localhost:3000/api/v1/blacklists/create";
    let myInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': `${loginEmail}`,
        'X-User-Token': `${loginReturnToken}`,
        'X-Blacklist-Id': 3
      }
    };

    fetch(endpoint, myInit)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        console.log("New blacklist has been added...")
      });
  });
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

      // Once login token is received - force change popup view current tab
      // TO DO: FORCE SET POPUP VIEWS OF ALL ACTIVE TABS???
      chrome.tabs.query({currentWindow: true, active: true}, function(tabArray) {
        setPopupViews(tabArray[0]);
      });

      // Get blacklists
      getBlacklists();

      // Get flashcards

    });
};


// HELPER FUNCTIONS
function setLoginEmail(emailInput) {
  loginEmail = emailInput.value;
};

function closePopup() {
  // ???
};

function addQueryToBlacklists(arr) {
  let newBlacklistsArray = [];
  arr.forEach((blacklist) => {
    let query = blacklist.website_url;
    // Deleting protocol + www
    let regexFront = new RegExp('(http:\/\/|https:\/\/|www.)', 'g');
    while (regexFront.test(query)) {
      query = query.replace(regexFront, "");
    };
    // Search for slashes and delete the end
    while (query.indexOf('/') >= 0) {
      query = query.slice(0, query.indexOf('/'));
    };
    blacklist["query"] = query;
    newBlacklistsArray.push(blacklist);
  });
  console.log("Query added to blacklistsArray...");
  console.log(newBlacklistsArray);
  return newBlacklistsArray;
};


// MESSAGE PASSING
// Start listening for messages from content.js
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {

    if (message.request == "blacklisted?" && blacklistsArray) {

      // Check sender.url agains blacklistsArray
      blacklistsArray.forEach((blacklist) => {

        let regexQuery = new RegExp(blacklist.query, 'g');
        if (regexQuery.test(sender.url)) {
          chrome.tabs.sendMessage(sender.tab.id, {
            response: "blacklisted",
            baseUrl: baseUrl
          });
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








