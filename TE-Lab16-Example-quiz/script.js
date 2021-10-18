/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let totalCorrect = 0;
let questions = [];
let questionCount = 0;
let currentQuestion = {};
let progressStatment = ""

function submitGuess(clickedbtn) {
  //x.querySelector(".example").innerHTML = "Hello World!";
  console.log(clickedbtn.innerHTML);
  
  console.log("Question: " + (questionCount + 1)) 
  console.log("out of: " + questions.length) 

  let guess = clickedbtn.innerHTML;

  if (questionCount + 1 < questions.length) {
    
    console.log()
    if (guess == currentQuestion.correct) {
      totalCorrect++;
    } else {
    }
    //make updates

    questionCount++;
    currentQuestion = questions[questionCount];
    updateQuiz();
  } else {
    //handle all the quiz is over stuff.
    console.log("Quiz is over");
    document.querySelector("#results-popover").style.visibility = "visible"
    document.querySelector(".quiz-container").style.visibility = "hidden"
    document.querySelector("#result").innerHTML = ` You got ${totalCorrect} out of ${questions.length}`
  }
}

function updateQuiz() {
  document.querySelector("#aQuestion").innerHTML = currentQuestion.question;

  document.querySelector("#answer-1").innerHTML = currentQuestion.choice1;

  document.querySelector("#answer-2").innerHTML = currentQuestion.choice2;
  document.querySelector("#answer-3").innerHTML = currentQuestion.choice3;
  document.querySelector("#answer-4").innerHTML = currentQuestion.choice4;

  progressStatment = `Question ${questionCount + 1} out of ${
    questions.length
  }`;

  document.querySelector("#question-count").innerHTML = progressStatment;
  document.querySelector("#prog-bar").max = questions.length
  document.querySelector("#prog-bar").value = questionCount
}

function restart(){
  
  totalCorrect = 0;
  questionCount = 0;
  currentQuestion = questions[questionCount];
  updateQuiz()
  
  document.querySelector("#results-popover").style.visibility = "hidden"
    document.querySelector(".quiz-container").style.visibility = "visible"
   
}

//questions build below:

let question0 = {
  question: "How long did the 100 Year War Last?",
  choice1: "100",
  choice2: "116",
  choice3: "99",
  choice4: "102",
  correct: "116"
};

let question1 = {
  question: "How many months have 28 days?",
  choice1: "2",
  choice2: "1",
  choice3: "12",
  choice4: "8",
  correct: "12"
};

let question2 = {
  question: "What do cows drink?",
  choice1: "milk",
  choice2: "cheese",
  choice3: "water",
  choice4: "soda",
  correct: "water"
};

let question3 = {
  question: "What is the capital of Sacramento?",
  choice1: "Nevada",
  choice2: "California",
  choice3: "Sac city",
  choice4: "None",
  correct: "None"
};

let question4 = {
  question: "In Texas, can you marry your widow's sister?",
  choice1: "With a permit",
  choice2: "Not after a recent supreme court decision.",
  choice3: "No, because the dead can't marry",
  choice4: "If she renounces her widow status",
  correct: "No, because the dead can't marry"
};

questions.push(question0);
questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);

console.log(questions);

currentQuestion = questions[questionCount];

updateQuiz();
