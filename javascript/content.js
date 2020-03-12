console.log("content.js running...");

// INSERT IFRAME

let baseUrl = "";
let iframeHeightContent = null;
let flashcardIframe = document.getElementById('flashcard-iframe');

function setbaseUrl(string) {
  baseUrl = string;
  console.log(`baseUrl set successfully: ${baseUrl}`);
};

function setIframeHeight(message) {
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
  <iframe width="348" frameborder="0" id="flashcard-iframe" style="position: absolute; right: 16px; top: 16px; z-index: 2147483647; border-radius: 8px; box-shadow: 2px 3px 10px grey" src="chrome-extension://ginifbbapdgbbglelocagabffednffek/views/flashcard.html">This is not working</iframe>
`;

let boxElement = `
  <div style="position: absolute; top: 0px; left; 0px; height: 100vh; width: 100vw; background-color: black; z-index: 2147483646; opacity: 0.8;"></div>
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
      // loadFlashcardHTML();
      loadFlashcardIframe();
    } else if (message.iframe_height) {

      console.log("setting iframe height...");
      setIframeHeight(message);

    } else {
      console.log(`message: ${message}`);
    };
  });

// Then send message from content.js (upon refresh) to background script
// (Requires extension ID - can we set this automatically?)
chrome.runtime.sendMessage("ginifbbapdgbbglelocagabffednffek", { request: "blacklisted?" });


