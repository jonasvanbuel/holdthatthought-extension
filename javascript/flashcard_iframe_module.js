console.log("flashcard_iframe_module running...");


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

let flashcardWindows = document.querySelectorAll('.flashcard-window');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let userAnswerTextarea = document.getElementById('user-answer-textarea');

let index = 0;
let currentFlashcardContent = null;

function loadNextFlashcard() {
  currentFlashcardContent = flashcardsArray[index];
  if (question && answer) {
    // SET QUESTION
    question.innerHTML = "";
    question.insertAdjacentHTML("afterbegin", currentFlashcardContent["question"]);
    // SET ANSWER
    answer.innerHTML = "";
    answer.insertAdjacentHTML("afterbegin", currentFlashcardContent["answer"]);
  };
};


// FLIP BUTTONS
let flipBtns = document.querySelectorAll('.flip-btn');
if (flipBtns) {
  flipBtns.forEach((flipBtn) => {
    flipBtn.addEventListener('click', function() {
      flashcardWindows.forEach((flashcardWindow) => {
        flashcardWindow.classList.toggle('hidden');
      });
    });
  });
};


// NEXT BUTTON
let nextBtn = document.querySelector('.next-btn');
if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    index += 1;
    if (index < 3) {
      userAnswerTextarea.innerText = "";
      flashcardWindows.forEach((flashcardWindow) => {
        flashcardWindow.classList.toggle("hidden");
      });

      loadNextFlashcard();
    } else if (index == 3) {
      console.log("Flashcards done. Reload page and don't show flashcards...")
      chrome.runtime.sendMessage("khnloolbiomiobhojdnncfckgpadenpg", { request: "release url" });
    };
  });
};

loadNextFlashcard();
