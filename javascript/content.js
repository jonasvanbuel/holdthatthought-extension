console.log("content.js running...");
let currentUrl = window.location.href;
console.log(`Current URL: ${currentUrl}`);

// INSERT IFRAME

let baseUrl = "";
let iframeHeightContent = null;
let flashcardIframe = document.getElementById('flashcard-iframe');

function setbaseUrl(string) {
  baseUrl = string;
  console.log(`baseUrl set successfully: ${baseUrl}`);
};

function setIframeHeight(message) {
  console.log("running setIframeHeight(message)...");
  flashcardIframe = document.getElementById('flashcard-iframe');
  flashcardIframe.height = "";
  flashcardIframe.height = `${message.iframe_height}px`;
};

function iframeLoaded() {
  let flashcardIframe = document.getElementById('flashcard-iframe');
  console.log("iframe loaded...");
  if (flashcardIframe) {
    let iframeHeight = flashcardIframe.document.body.scrollHeight;
    console.log(`iframeHeight: ${iframeHeight}`)
  };
};


let iframe =`
  <iframe width="348" height="368" frameborder="0" id="flashcard-iframe" style="position: absolute; right: 16px; top: 16px; z-index: 2147483647; border-radius: 8px; box-shadow: 0px 0px 10px grey" src="chrome-extension://khnloolbiomiobhojdnncfckgpadenpg/views/flashcard.html">This is not working</iframe>
`;

let boxElement = `
  <div id="box-element" style="position: absolute; top: 0px; left; 0px; height: 100vh; width: 100vw; background-color: black; z-index: 2147483646; opacity: 0.8;"></div>
`;


function loadFlashcardIframe() {
  let body = document.getElementsByTagName("body")[0];
  let head = document.getElementsByTagName("head")[0];

  body.style.height = "100%";
  body.style.overflow = "hidden";

  body.insertAdjacentHTML('afterbegin', boxElement);
  body.insertAdjacentHTML('afterbegin', iframe);
};


// MESSAGE PASSING
// Start listening for messages from background.js
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log("Receiving message from background.js...")

    if (message.response == "blacklisted") {
      // 1. Set base URL for iframe views
      setbaseUrl(message.baseUrl);
      // 2. Initiate the view
      loadFlashcardIframe();
    } else if (message.response == "release url") {
      let flashcardIframe = document.getElementById('flashcard-iframe');
      flashcardIframe.parentNode.removeChild(flashcardIframe);
      let boxElement = document.getElementById('box-element');
      boxElement.parentNode.removeChild(boxElement);
      let body = document.getElementsByTagName("body")[0];
      body.style.height = null;
      body.style.overflow = null;
    }
    else {
      console.log(`message: ${message}`);
    };
  });

// Then send message from content.js (upon refresh) to background script
// (Requires extension ID - can we set this automatically?)
chrome.runtime.sendMessage("khnloolbiomiobhojdnncfckgpadenpg", { request: "blacklisted?" });


