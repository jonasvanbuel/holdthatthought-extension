console.log("flashcard_iframe_module running...");

const flashcardsArray = [
  {
    question: "<p>How do you install gems you added to your Gemfile?</p>",
    answer: `<p>Kill any web server running (Ctrl + C). Run bundle install. Restart the Rails server with rails s.</p>`
  },
  {
    question: `<p>What does this return?</p>
              <div class='code-block'>rails generate controller pages features pricing contact</div>`,
    answer: "<p>It generates a PagesController with three actions features, pricing and contact and associated routes and views.</p>"
  },
  {
    question: "<p>Which information does rails routes display?</p>",
    answer: `<p>rails routes show you a list of your routes with details</p>
            <ul>
              <li>Prefix is the rails path prefix of the associated route</li>
              <li>Verb is the HTTP verb of the route</li>
              <li>URI Pattern is the path of the route</li>
              <li>Controller#Action are targeted controller and method</li>
            </ul>`
  }
];

let iFrameHeight = null;
let flashcardWindows = document.querySelectorAll(".flashcard-window");
let flipBtns = document.querySelectorAll(".flip-btn");

function getIframeHeight() {

  iframeHeight = document.body.scrollHeight;

  console.log("Changing iframe height...");
  console.log(`new iframeHeight: ${iframeHeight}`);
  // Then send message from content.js to background script
  // (Requires extension ID - can we set this automatically?)
  chrome.runtime.sendMessage("ginifbbapdgbbglelocagabffednffek", {
    iframe_height: `${iframeHeight}`
  });
};

// Send iframe height upon initial load
getIframeHeight();

// TODO: Send height every time DOM is updated...

flipBtns.forEach((flipBtn) => {
  flipBtn.addEventListener("click", function() {

    // Update DOM
    flashcardWindows.forEach((flashcardWindow) => {
      flashcardWindow.classList.toggle("hidden");
    });

    // Get and set iframe height...
    getIframeHeight();
    // setTimeout(getIframeHeight(), 100);

  });
});
