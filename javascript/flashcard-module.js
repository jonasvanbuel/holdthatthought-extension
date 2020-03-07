let body = document.getElementsByTagName('body')[0];
let head = document.getElementsByTagName('head')[0];

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

let index = 0;

function loadBackgroundHTML() {

  console.log("Loading background html...");

  fetch('chrome-extension://ginifbbapdgbbglelocagabffednffek/views/background.html')
    .then(response => response.text())
    .then((data) => {
      // // 2. Parse html string to DOM tree
      // let domparser = new DOMParser();
      // htmlDoc = domparser.parseFromString(data, 'text/xml');


      // let question = htmlDoc.querySelector("#question");
      // // 3. Insert new question
      // question.innerHTML = flashcardsArray[index].question;
      // // 4. Serialize DOM tree to html string
      // let XMLS = new XMLSerializer();
      // let updatedQuestion = XMLS.serializeToString(htmlDoc);
      body.style.margin = "0";
      body.insertAdjacentHTML('beforeend', data);
    });
}

function loadFlashcardStyling() {

  console.log("Loading flashcard styling...");

  fetch('chrome-extension://ginifbbapdgbbglelocagabffednffek/css/flashcard.css')
    .then(response => response.text())
    .then((data) => {
      head.innerHTML = "";
      let newEl = document.createElement('style');
      newEl.innerHTML = data;
      let XMLS = new XMLSerializer();
      let updatedEl = XMLS.serializeToString(newEl);
      head.insertAdjacentHTML('beforeend', updatedEl);
    });
};

function loadFlashcardScript() {

  console.log("Loading flashcard script...");

  let flashcardWindows = document.querySelectorAll(".flashcard-window");
  let flipBtns = document.querySelectorAll(".flip-btn");

  flipBtns.forEach((flipBtn) => {
    flipBtn.addEventListener("click", function() {
      flashcardWindows.forEach((flashcardWindow) => {
        flashcardWindow.classList.toggle("hidden");
      });
    });
  });

  let nextBtn = document.querySelector('.next-btn');
  nextBtn.addEventListener("click", function() {
    index += 1;
    console.log(`index: ${index}`);
    if (index < 3) {
      loadFlashcardHTML();
    }
    else {
      loadFlashcardHTML();
      console.log("Congratulations, you've finished...")
    }
  });
};

function loadFlashcardHTML() {

  body.innerHTML = "";

  loadFlashcardStyling();
  loadBackgroundHTML();

  if (index < 3) {

    // 1. Load question partial as text
    fetch('chrome-extension://ginifbbapdgbbglelocagabffednffek/views/question.html')
      .then(response => response.text())
      .then((data) => {
        // 2. Parse html string to DOM tree
        let domparser = new DOMParser();
        htmlDoc = domparser.parseFromString(data, 'text/xml');
        let question = htmlDoc.querySelector("#question");
        // 3. Insert new question
        question.innerHTML = flashcardsArray[index].question;
        // 4. Serialize DOM tree to html string
        let XMLS = new XMLSerializer();
        let updatedQuestion = XMLS.serializeToString(htmlDoc);
        body.insertAdjacentHTML('beforeend', updatedQuestion);
      });

      // 1. Load answer partial as text
      fetch('chrome-extension://ginifbbapdgbbglelocagabffednffek/views/answer.html')
        .then(response => response.text())
        .then((data) => {
          // 2. Parse html string to DOM tree
          let domparser = new DOMParser();
          htmlDoc = domparser.parseFromString(data, 'text/xml');
          let answer = htmlDoc.querySelector("#answer");
          // 3. Insert new answer
          answer.innerHTML = flashcardsArray[index].answer;
          // 4. Serialize DOM tree to html string
          let XMLS = new XMLSerializer();
          let updatedAnswer = XMLS.serializeToString(htmlDoc);
          body.insertAdjacentHTML('beforeend', updatedAnswer);

          // ADD SCRIPT TO ELEMENT
          loadFlashcardScript();

        });
  };
};
