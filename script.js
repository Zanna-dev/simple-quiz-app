// Quiz questions array | Data structure to hold questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "paris", correct: true },
      { text: "london", correct: false },
      { text: "berlin", correct: false },
      { text: "madrid", correct: false },
    ],
  },
  {
    question: "What is the capital of Germany?",
    answers: [
      { text: "london", correct: false },
      { text: "berlin", correct: true },
      { text: "paris", correct: false },
      { text: "madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "jupiter", correct: false },
      { text: "saturn", correct: false },
      { text: "mars", correct: true },
      { text: "venus", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "sahara", correct: false },
      { text: "amazon", correct: false },
      { text: "siberia", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
];

// Accessing HTML elements
// CONNECTING JAVASCRIPT TO HTML
const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.querySelector("#next-btn");

// Variables to track current question and score
// These values change while the quiz runs
// That’s why we use let, not const
let currentQuestionIndex = 0;
let score = 0;

// STARTING THE QUIZ
// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0; // start from first question
  score = 0; // reset score
  nextButton.innerHTML = "Next";
  showQuestion(); // display first question
}

function showQuestion() {
    resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  } )
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("isCorrect");
        score++;
    } else {
        selectedBtn.classList.add("inCorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("isCorrect");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {  
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();
