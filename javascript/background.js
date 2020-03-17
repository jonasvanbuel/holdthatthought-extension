console.log("background.js running...");

// VARIABLES
// User not logged in upon restart
// let loginEmail = null;
let loginEmail = "jonas.vanbuel@gmail.com";
// let loginReturnToken = null;
let loginReturnToken = "D8G-b_VuKydHzU7_7D4v";
getBlacklists();

const baseUrl = chrome.runtime.getURL('/');

let blacklistsArray = null;

function setPopupViews(tab) {

  console.log(tab);
  console.log(`tab_id: ${tab.id}`);
  console.log(`tab_url: ${tab.url}`);

  // If logged in and received blacklistsArray
  if (loginEmail && loginReturnToken && blacklistsArray) {

    console.log('Logged in and received blacklists... Testing if tab.url is blacklisted...');

    console.log("Popup view DEFAULT set to popup_not_blacklisted.html...");
    chrome.browserAction.setPopup({
      "tabId": tab.id,
      "popup": chrome.runtime.getURL('/views/popup_not_blacklisted.html')
    });

    // Now testing for matches...
    blacklistsArray.forEach((blacklist) => {
      let regexQuery = new RegExp(blacklist.website_name, 'g');
      if (regexQuery.test(tab.url)) {

        // If blacklisted
        console.log("SUCCESS: Popup view set to popup_blacklisted.html...");
        chrome.browserAction.setPopup({
          "tabId": tab.id,
          "popup": chrome.runtime.getURL('/views/popup_blacklisted.html')
        });

      };
    });
  } else {

    // If not yet logged in
    console.log("Popup view set to popup_login.html...");
    chrome.browserAction.setPopup({
      "tabId": tab.id,
      "popup": chrome.runtime.getURL('/views/popup_login.html')
    });
  }
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
      blacklistsArray = data;
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
        'X-Blacklist-Name': `${getWebsiteName(blacklistUrl)}`,
        'X-Blacklist-Url': `${blacklistUrl}`
      }
    };

    fetch(endpoint, myInit)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        console.log("New blacklist has been added...");
        blacklistsArray = data;
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

function getWebsiteName(url) {
  website_name = url;
  // Deleting protocol + www
  let regexFront = new RegExp('(http:\/\/|https:\/\/|www.)', 'g');
  while (regexFront.test(website_name)) {
    website_name = website_name.replace(regexFront, "");
  };
  // Search for slashes and delete the end
  while (website_name.indexOf('/') >= 0) {
    website_name = website_name.slice(0, website_name.indexOf('/'));
  };
  console.log(`Website_name: ${website_name}`);
  return website_name;
};

function checkIfBlacklisted(tab) {



  // chrome.tabs.query({currentWindow: true, active: true}, function(tabArray) {
  //   let urlToCheck = tabArray[0].url;
  //   // console.log(urlToCheck);
  //   // let result = false;

  //   if (blacklistsArray) {
  //     blacklistsArray.forEach((blacklist) => {
  //       if (blacklist.website_name == getWebsiteName(urlToCheck)) {
  //         return true;
  //       };
  //     });
  //   } else {
  //     console.log("Blacklists not yet loaded...");
  //     return false;
  //   };
  // });
};


// Evaluate popup view for every tab update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  setPopupViews(tab);
});


// MESSAGE PASSING
// Start listening for messages from content.js
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {

    if (message.request == "blacklisted?" && blacklistsArray) {

      // Check sender.url agains blacklistsArray
      blacklistsArray.forEach((blacklist) => {

        let regexQuery = new RegExp(blacklist.website_name, 'g');

        if (regexQuery.test(sender.url)) {
          chrome.tabs.sendMessage(sender.tab.id, {
            response: "blacklisted",
            baseUrl: baseUrl
          });
        };
      });
    } else if (message.request == "release url") {
      chrome.tabs.sendMessage(sender.tab.id, {
        response: "release url"
      });
    }

    // Listen for other requests from content.js
    else {
      console.log(message);
      chrome.tabs.sendMessage(sender.tab.id, { response: "Not blacklisted or not logged in" });
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








