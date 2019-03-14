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
document.querySelector(".restart").addEventListener('click', function() {
  location.reload();
});
document.querySelector(".reward").addEventListener('click', function() {
  cornify_add();
});


let numberOfQuizzes = data.quizzes.length;
let numberOfQuestions = "";
let score = 0;
let currentQuesIndex = 0;
let chosenQuiz = "";
const happySound = new Audio("./audio/Correct-answer.mp3")
const sadSound = new Audio("./audio/Short-game-show-buzzer-sound.mp3");
const failMsgs = ["Did I stutter?!? 👨🏿 ", "At least your dog still loves you 🐶", "Give me your lunch. It's mine now. 🍱", "No GOD Please, NOOO!😡", "You took a life here today... The life of the party 💀", "Never half-ass two things, whole ass one thing.🍑 - Ron Swanson", "I want you to think long and hard... (That's what she said) 🤣 "]
const passMsgs = ["🧠 Brains and braun! 💪", "Why waste time say lot of word when one word do trick? 💬 ", "I'm not usually one for speeches... so... Goodbye. 👋", "that'll do pig, that'll do... 🐷", "You worked while they partied. Now you go party while they work!🥳", "Not the hero we need, but the hero we deserve. 🦸", "Jordan Schlansky, is that you!? 🤖 ", "the salt...🧂"]


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
    currentQuesIndexOfSelectedQuiz.answers[i].value ? optnBtns[i].classList.add("right-answer") : optnBtns[i].classList.add("wrong-answer");
  }
  //add eventListener for each options button
  optnBtns.forEach(btn => btn.addEventListener("click", pickedMe));
}

function pickedMe() {
  let chosenOptn = this;
  evaluate(chosenOptn);
  displayScore();
  //disable buttons
  document.querySelectorAll(".btnOption").forEach(function(e) {
    e.disabled = true;
  })
  //change page after timeout of 2 seconds
  setTimeout(function() {
    currentQuesIndex++;
    if (currentQuesIndex === numberOfQuestions) {
      showScoreScreen();
    } else {
      document.querySelectorAll(".btnOption").forEach(function(e) {
        e.disabled = false;
        e.className = "btnOption";
      })
      populate();
    }
  }, 2000);
}

function evaluate(btn) {
  //if selected option is the right answer
  if (data.quizzes[chosenQuiz].questions[currentQuesIndex].answers[btn.value].value) {
    score++;
    happySound.currentTime = 0;
    happySound.play();
  } else { //if selected option is the wrong answer
    sadSound.currentTime = 0;
    sadSound.play();
    btn.classList.add("wrongHighlight");
  }
  document.querySelector(".right-answer").classList.add("correctHighlight")
}

function showScoreScreen() {
  document.getElementById("questionScreen").style.display = "none";
  document.getElementById("scoreScreen").style.display = "block";
}

function displayScore() {
  document.querySelectorAll(".score").forEach(function(e) {
    e.textContent = score;
  });
  const resultMsg = document.getElementById("result");
  const quoteMsg = document.getElementById("quote");
  let randoPassMsg = Math.floor(Math.random() * passMsgs.length);
  let randoFailMsg = Math.floor(Math.random() * failMsgs.length);
  score > 0.5 * numberOfQuestions ? (resultMsg.textContent = "PASS", quoteMsg.textContent = passMsgs[randoPassMsg]) : (result.textContent = "FAIL", quoteMsg.textContent = failMsgs[randoFailMsg]);
}
