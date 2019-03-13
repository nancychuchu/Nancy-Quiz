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
let score = 0;
let currentQuesIndex = 0

//Add click handler to start startButtons
const quizBtns = document.querySelectorAll(".quiz");
quizBtns.forEach(btn => btn.addEventListener("click", populate));

function populate() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("questionScreen").style.display = "block";

  let selectedQuiz = data.quizzes[this.value];
  const optnBtns = document.querySelectorAll(".btnOption");
  const answers = selectedQuiz.questions[currentQuesIndex].answers.content;
  const numberOfOptions = selectedQuiz.questions[currentQuesIndex].answers.length;

  console.log(answers);
  //populate question
  document.getElementById("question").textContent = selectedQuiz.questions[currentQuesIndex].question;
  //populate options buttons
   for (let i = 0; i<numberOfOptions ; i++){
     optnBtns[i].textContent=selectedQuiz.questions[currentQuesIndex].answers[i].content;
   }

}
