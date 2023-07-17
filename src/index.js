const questions = [
  {
    question: "What shape is used for stop signs?",
    answers: [
      { text: "circle", correct: false },
      { text: "hexagon", correct: false },
      { text: "octogon", correct: true },
      { text: "trapezoid", correct: false },
    ],
  },
  {
    question: "What is cynophobia?",
    answers: [
      { text: "being cynnical", correct: false },
      { text: "fear of dogs", correct: true },
      { text: "fear of whales", correct: false },
      { text: "fear of circles", correct: false },
    ],
  },
  {
    question: "How many languages are written from right to left?",
    answers: [
      { text: "0", correct: false },
      { text: "4", correct: false },
      { text: "8", correct: false },
      { text: "12", correct: true },
    ],
  },
  {
    question: "What is the name of the biggest tech company in South Korea?",
    answers: [
      { text: "TCL", correct: false },
      { text: "Samsung", correct: true },
      { text: "Tesla", correct: false },
      { text: "HCL", correct: false },
    ],
  },
  {
    question:
      "Which monarch officially made Valentine's Day a holiday in 1537?",
    answers: [
      { text: "Henry VIII", correct: true },
      { text: "Louis XIV", correct: false },
      { text: "Charles I", correct: false },
      { text: "Heenry VIII", correct: false },
    ],
  },
  {
    question: "Wh owas the first female pilot to fly across the atlantinc?",
    answers: [
      { text: "Bessie Coleman", correct: false },
      { text: "Amelia Earhart", correct: true },
      { text: "Harriet Quimby", correct: false },
      { text: "Blanche Scott", correct: false },
    ],
  },
  {
    question: "What is the rarest M&M color?",
    answers: [
      { text: "red", correct: false },
      { text: "blue", correct: false },
      { text: "orange", correct: false },
      { text: "Brown", correct: true },
    ],
  },
  {
    question:
      "Which is the only American Football team to go a whole season undefeated, including the Super Bowl?",
    answers: [
      { text: "Kansas City Chiefs (2004)", correct: false },
      { text: "Dalls Cowboys (1984)", correct: false },
      { text: "Miami Dolphins (1972)", correct: true },
      { text: "New York Giants (1997)", correct: false },
    ],
  },
  {
    question: "What's the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Monaco", correct: false },
      { text: "Maldives", correct: false },
      { text: "Barbados", correct: false },
    ],
  },
  {
    question: "Area 51 is in which US state?",
    answers: [
      { text: "Texas", correct: false },
      { text: "New Mexico", correct: false },
      { text: "Utah", correct: false },
      { text: "Nevada", correct: true },
    ],
  },
  {
    question: "How many hearts does an octopus have?",
    answers: [
      { text: "8", correct: false },
      { text: "4", correct: false },
      { text: "3", correct: true },
      { text: "1", correct: false },
    ],
  },
  {
    question: "The unicorn is the national animal of which country?",
    answers: [
      { text: "Ireland", correct: false },
      { text: "Scotland", correct: true },
      { text: "Denmark", correct: false },
      { text: "France", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const submitButton = document.getElementById("submit-btn");

let currentQuestionIndex = 0;
let score = 0;

function startTrivia() {
  currentQuestionIndex = 0;
  score = 0;
  submitButton.innerHTML = "Submit";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  submitButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  submitButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  submitButton.innerHTML = "Play again";
  submitButton.style.display = "block";
}

function handleSubmitButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
submitButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleSubmitButton();
  } else {
    startTrivia();
  }
});
startTrivia();

//timer functions
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 45;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
