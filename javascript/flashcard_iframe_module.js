console.log("flashcard_iframe_module running...");

let flashcardWindow = document.getElementById('flashcard-window');
let questionAnswer = document.getElementById('question-answer');
// let flipBtns = document.querySelectorAll(".flip-btn");


const flashcardsArray = [
  {
    id: 1,
    question: "<p>How do you install gems you added to your Gemfile?</p>",
    answer: `<p>Kill any web server running (Ctrl + C). Run bundle install. Restart the Rails server with rails s.</p>`,
    completed: false
  },
  {
    id: 2,
    question: `<p>What does this return?</p>
              <div class='code-block'>rails generate controller pages features pricing contact</div>`,
    answer: "<p>It generates a PagesController with three actions features, pricing and contact and associated routes and views.</p>",
    completed: false
  },
  {
    id: 3,
    question: "<p>Which information does rails routes display?</p>",
    answer: `<p>rails routes show you a list of your routes with details</p>
            <ul>
              <li>Prefix is the rails path prefix of the associated route</li>
              <li>Verb is the HTTP verb of the route</li>
              <li>URI Pattern is the path of the route</li>
              <li>Controller#Action are targeted controller and method</li>
            </ul>`,
    completed: false
  }
];







// BUTTON EVENT LISTENERS
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

// Insert next btn when showing answer
let nextBtn = `
  <a href="#" class='next-btn'>
    <p>next</p>
  </a>
`;




