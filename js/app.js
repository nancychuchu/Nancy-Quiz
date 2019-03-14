const data = {
  "quizzes": [{
    "title": "Abstract Quiz",
    "questions": [{
      "question": "If two left handed people argue, which one is right?",
      "answers": [{
        "content": "The one on the right.",
        "value": false
      }, {
        "content": "The one on the left.",
        "value": true
      }, {
        "content": "The one with the gun.",
        "value": false
      }, {
        "content": "Tom.",
        "value": false
      }]
    }, {
      "question": "What does Google use if it can't find an answer on Google?",
      "answers": [{
        "content": "Bing",
        "value": false
      }, {
        "content": "Bang",
        "value": false
      }, {
        "content": "Bong",
        "value": false
      }, {
        "content": "Ask Jeeves",
        "value": true
      }]
    }, {
      "question": "What kind of pants do Mario and Luigi wear?",
      "answers": [{
        "content": "Dussault apparel slashed jeans",
        "value": false
      }, {
        "content": "Tapered bell bottoms",
        "value": false
      }, {
        "content": "Acid washed Guccis",
        "value": false
      }, {
        "content": "Denim denim denim",
        "value": true
      }]
    }]
  }, {
    "title": "Dev Quiz",
    "questions": [{
      "question": "How many programmers does it take to change a lightbulb?",
      "answers": [{
        "content": "x = x + 1",
        "value": false
      }, {
        "content": "undefined",
        "value": false
      }, {
        "content": "NaN === NaN",
        "value": false
      }, {
        "content": "None. It's a hardware problem.",
        "value": true
      }]
    }, {
      "question": "What's the object oriented way to become wealthy?",
      "answers": [{
        "content": "Inheritance",
        "value": true
      }, {
        "content": "Have some class",
        "value": false
      }, {
        "content": "Super props",
        "value": false
      }, {
        "content": "Wealth is subjective",
        "value": false
      }]
    }, {
      "question": "What should you do when a bug is sad?",
      "answers": [{
        "content": "Help it out of a bind",
        "value": false
      }, {
        "content": "Console it",
        "value": true
      }, {
        "content": "Express your feelings",
        "value": false
      }, {
        "content": "Be more responsive",
        "value": false
      }]
    }]
  }]
}

//Begin with only Start Screen
document.getElementById("questionScreen").style.display = "none";
document.getElementById("scoreScreen").style.display = "none";

let numberOfQuizzes = data.quizzes.length;
let numberOfQuestions = "";
let score = 0;
let currentQuesIndex = 0;
let chosenQuiz = "";
const happySound = new Audio("./audio/Correct-answer.mp3")
const sadSound = new Audio("./audio/Short-game-show-buzzer-sound.mp3");

//Add click handler to start startButtons
const quizBtns = document.querySelectorAll(".quiz");
quizBtns.forEach(btn => btn.addEventListener("click", displayQuiz));

function displayQuiz() {
  numberOfQuestions = data.quizzes[this.value].questions.length;
  chosenQuiz = this.value;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("questionScreen").style.display = "block";

  populate();
}

function populate() {

  let currentQuesIndexOfSelectedQuiz = data.quizzes[chosenQuiz].questions[currentQuesIndex];
  const optnBtns = document.querySelectorAll(".btnOption");
  const numberOfOptions = currentQuesIndexOfSelectedQuiz.answers.length;

  //populate question
  document.getElementById("question").textContent = currentQuesIndexOfSelectedQuiz.question;
  //populate options buttons
  for (let i = 0; i < numberOfOptions; i++) {
    optnBtns[i].textContent = currentQuesIndexOfSelectedQuiz.answers[i].content;
  }
  //add eventListener for each options button
  optnBtns.forEach(btn => btn.addEventListener("click", pickedMe));
}

function pickedMe() {
  //add attributes for correct and wrong answers
  const chosenOptn = this;
  console.log(this.classList);
  //check if true
  evaluate(chosenOptn);
  showCurrentScore();

  //change page after timeout of 2 seconds
  setTimeout(function() {
    currentQuesIndex++;
    if (currentQuesIndex == numberOfQuestions) {
      showScoreScreen();
    } else {
      populate();
    }

  }, 1000);
}


function evaluate(btn) {
  //if chosen button is correct
  if (data.quizzes[chosenQuiz].questions[currentQuesIndex].answers[btn.value].value) {
    score++;
    happySound.play();
    //btn.classList.add("correctHighlight");

  } else {
    sadSound.play();
    //btn.classList.add("wrongHighlight");
    // document.querySelector(".right-answer").classList.add("correctHighlight");
  }

  //if chosen button is incorrect


}

function showCurrentScore() {
  document.getElementById("score").textContent = score;
}

function showScoreScreen() {
  document.getElementById("questionScreen").style.display = "none";
  document.getElementById("scoreScreen").style.display = "block";
}
