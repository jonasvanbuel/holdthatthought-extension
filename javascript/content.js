console.log("content.js running...");

// Fetch flashcards with API
const flashcardsArray = [
  {
    question: "How do you install gems you added to your Gemfile?",
    answer: "Kill any web server running (Ctrl + C). Run bundle install. Restart the Rails server with rails s."
  },
  {
    question: "What does this return? rails gnerate controller pages features pricing contact",
    answer: "It generates a PagesController with three actions features, pricing & contact and associated routes and views."
  },
  {
    question: "Which information does rails routes display?",
    answer: `rails routes show you a list of your routes with details:
                * Prefix is the rails path prefix of the associated route
                * Verb is the HTTP verb of the route
                * URI Pattern is the path of the route
                * Controller#Action are targeted controller and method`
  }
];

let flashcardViewUrl = "";
function setflashcardViewUrl(string) {
  flashcardViewUrl = string;
  console.log(`flashcardViewUrl set successfully: ${flashcardViewUrl}`);
}

let iframe =`
  <iframe style="position: absolute; right: 16px; top: 16px; z-index: 1000000; border-radius: 8px; box-shadow: 2px 3px 10px grey" src="chrome-extension://ginifbbapdgbbglelocagabffednffek/views/flashcard.html" height="369" width="300" frameborder="0">This is not working</iframe>
`;

function initFlashcardView() {
  let body = document.getElementsByTagName("body")[0];
  let head = document.getElementsByTagName("head")[0];
  // body.innerHTML = iframe;
  body.insertAdjacentHTML('afterbegin', iframe);
}

// Start listening for messages
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log("Receiving message from background.js...")
    console.log(message);
    if (message.response == "blacklisted") {
      // 1. Set base URL for iframe views
      setflashcardViewUrl(message.flashcardViewUrl);
      // 2. Initiate the view
      initFlashcardView();
    }
    else {
      console.log(message);
    };
  });

// Then send message from content.js (upon refresh) to background script
// (Requires extension ID - can we set this automatically?)
chrome.runtime.sendMessage("ginifbbapdgbbglelocagabffednffek", { request: "blacklist" });


















