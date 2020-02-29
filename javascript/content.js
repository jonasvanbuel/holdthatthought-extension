// fetch("https://api.github.com/users/ssaunier")
//   .then(response => response.json())
//   .then(data => console.log(data))

const flashcard = {
  question: "How do you install gems you added to your Gemfile?",
  answer: "Kill any web server running (Ctrl + C). Run bundle install. Restart the Rails server with rails s"
}

// Set DOM elements
const flashcard_window = document.getElementById("flashcard_window")

// Add listener to 'flip card' button
function addListenerToBtn() {
  const flip_card_btn = document.getElementById("flip_card_btn");
  flip_card_btn.addEventListener("click", console.log("button clicked"));
}


// Build question HTML
function showQuestion() {
  let question_HTML =
  `<div class="flashcard-container">
    <div class="flashcard-category">
      <img src="images/rails-logo.svg" alt="Rails logo" width="">
    </div>
    <div id="question">${flashcard["question"]}</div>
    <textarea class="user-answer" rows="4" placeholder="Enter your answer here"></textarea>
    <a href="#" class="btn btn-light" id="flip_card_btn">
      <i class="fas fa-redo"></i>
      flip card
    </a>
  </div>`;
  flashcard_window.innerHTML = "";
  flashcard_window.insertAdjacentHTML('beforeend', question_HTML);
}

showQuestion();





// Build answer HTML




