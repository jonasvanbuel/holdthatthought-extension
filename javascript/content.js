console.log("content.js running...");

// let baseUrl = "";
// function setbaseUrl(string) {
//   baseUrl = string;
//   console.log(`baseUrl set successfully: ${baseUrl}`);
// }

// let iframe =`
//   <iframe style="position: absolute; right: 16px; top: 16px; z-index: 2147483647; border-radius: 8px; box-shadow: 2px 3px 10px grey" src="chrome-extension://ginifbbapdgbbglelocagabffednffek/views/flashcard.html" width="348" height="331" frameborder="0">This is not working</iframe>
// `;

// let boxElement = `
//   <div style="position: absolute; top: 0px; left; 0px; height: 100vh; width: 100vw; background-color: black; z-index: 2147483646; opacity: 0.8;"></div>
// `;

// function initFlashcardView() {
//   let body = document.getElementsByTagName("body")[0];
//   let head = document.getElementsByTagName("head")[0];

//   body.style.height = "100%";
//   body.style.overflow = "hidden";

//   body.insertAdjacentHTML('afterbegin', boxElement);
//   body.insertAdjacentHTML('afterbegin', iframe);
// }


// Start listening for messages
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log("Receiving message from background.js...")
    console.log(`message: ${message}`);
    if (message.response == "blacklisted") {
      // 1. Set base URL for iframe views
      // setbaseUrl(message.baseUrl);
      // 2. Initiate the view
      loadFlashcardHTML();
    }
    else {
      console.log(message);
    };
  });

// Then send message from content.js (upon refresh) to background script
// (Requires extension ID - can we set this automatically?)
chrome.runtime.sendMessage("ginifbbapdgbbglelocagabffednffek", { request: "blacklist" });


