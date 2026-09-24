import questions from "./questions.js";

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  let current = questions[currentQuestion];
  questionText.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach((option) => {
    let button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    optionsContainer.appendChild(button);
  });
}

loadQuestion();

optionsContainer.addEventListener("click", (event) => {
  let selected = event.target;

  if (!selected.classList.contains("option-btn")) return;

  let correctAnswer = questions[currentQuestion].answer;
  let allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selected.textContent === correctAnswer) {
    score++;
  } else {
    selected.classList.add("incorrect");
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
});

function showResult() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  loadQuestion();
});