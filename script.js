const questions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading CSS",
      "Cascading style sheets",
      "Cascading separate style"
    ],
    answer: "2"
  },
  {
    question: "Which attribute can set text to bold?",
    options: ["Text-decoration", "Font style", "Font weight"],
    answer: "3"
  },
  {
    question: "Which tag is used to link an external CSS file?",
    options: ["Script", "Link", "Rel"],
    answer: "2"
  },
  {
    question: "Which attribute sets the underline property?",
    options: ["Font style", "Text-decoration", "Font weight"],
    answer: "2"
  },
  {
    question: "Which measurement is NOT relative?",
    options: ["Px", "Cm", "%", "Em"],
    answer: "2"
  },
  {
    question: "Which measurement unit IS relative?",
    options: ["Em", "Cm", "MM", "Inch"],
    answer: "1"
  },
  {
    question:
      "What attribute is used move an elements content away from its border?",
    options: ["Margin", "Padding", "Border", "Width"],
    answer: "2"
  },
  {
    question:
      "Which attribute does not contribute to a block elements total width?",
    options: ["Width", "Border", "Background-image", "Padding"],
    answer: "3"
  },
  {
    question: "What property changes positioned elements display order?",
    options: ["Width", "Background", "Z-index", "Azimuth"],
    answer: "3"
  },
  {
    question:
      "Which value of background-repeat will cause a background to repeat vertically?",
    options: ["Repeat-x", "Repeat", "Repeat-y", "No-repeat"],
    answer: "3"
  }
];

//rating system, show correct answers that was wrong.
//check if any questions left.

let questionCount = 0;
let userScore = 0;
let userChoice;
let questionsWrong = [];
document.getElementById("score").innerText = userScore;

function startQuiz() {
  document.querySelector(".quiz-start").style.display = "none";
  document.querySelector("#quiz-container").style.display = "block";
  displayQandA(questionCount);
}

function updateQandA() {
  questionCount++;
  if (questionCount == 10) {
    alert("Run DisplayResults");
    //run displayResults
    return;
  }
  displayQandA(questionCount);
}

function checkAnswer() {
  let correctAns = questions[questionCount].answer;
  let userAns = document.querySelector('input[name="options"]:checked');
  if (!userAns) {
    //if the user has not selected an answer.
    //display error message;
    alert("wrong");
    return;
  }

  if (userAns.value !== correctAns) {
    const wrongQuestion = {
      qNumber: questionCount,
      userChoice: userAns.value
    };
    console.log(wrongQuestion);
    questionsWrong.push(wrongQuestion);
    console.log(questionsWrong);
    // alert("Wrong");
    updateQandA();
  } else {
    userScore++;
    document.getElementById("score").innerText = userScore;
    // alert("Right");
    updateQandA();
  }
}

function displayQandA(x) {
  document.querySelector(".question").innerText = `${questionCount + 1}. ${
    questions[x].question
  }`;
  let choices = "";
  questions[x].options.forEach(function(option, index) {
    choices += `<input type='radio' name='options' value="${index +
      1}">${option}<br>`;
  });
  document.getElementById("answerList").innerHTML = choices;
}
