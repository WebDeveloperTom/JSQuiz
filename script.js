// questions object
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

//Keeping track of the current question count
let questionCount = 0;
//The users current score.
let userScore = 0;
// The object containing all the questions the user has got wrong.
let questionsWrong = [];
//The users highest quiz score for this session.
let userHighScore = 0;

function startQuiz() {
  //hide the start quiz button and display the quiz and preogress bar.
  document.querySelector(".quiz-start").style.display = "none";
  document.querySelector("#quiz-container").style.display = "";
  document.querySelector("#barContainer").style.display = "";
  //increase progressBar
  let percent = (questionCount + 1) * 10;
  document.querySelector(".progressBar").style.width = `${percent}%`;
  //fetches current question and displays
  displayQandA(questionCount);
}

function displayQandA(x) {
  //takes in a value and fetches and display the value's question and choices.
  document.querySelector(".question").innerText = `${x + 1}. ${
    questions[x].question
  }`;
  let choices = "";
  //loops over each answer in the array and creates a radio button for each
  questions[x].options.forEach(function(option, index) {
    choices += `<div class='answerItem'><label><input type='radio' name='options' value="${index +
      1}"><span>${option}</span></label></div><br>`;
  });
  document.getElementById("answerList").innerHTML = choices;
}

function checkAnswer() {
  //grab the correct answer from the question array
  let correctAns = questions[questionCount].answer;
  //grabbing any checked radio buttons
  let userAns = document.querySelector('input[name="options"]:checked');
  //checking to see if there ARE any checked radio buttons
  if (!userAns) {
    //if the user has not selected an answer.
    //display error message;
    document.getElementById("response").innerHTML =
      "<p class='warning'>Please select an option</p>";
    return;
  }
  //if the user answer doesnt match the correct answer
  if (userAns.value !== correctAns) {
    //get the question number and users selection and create an object
    const wrongQuestion = {
      qNumber: questionCount,
      userChoice: userAns.value
    };
    //push the object into an array for use in the result screen
    questionsWrong.push(wrongQuestion);
    //update the question
    updateQandA();
  } else {
    //answer is correct, increase the score
    userScore++;
    //update the question
    updateQandA();
  }
}

function updateQandA() {
  //remove any warning responses
  document.getElementById("response").innerHTML = "";
  //increase the question count
  questionCount++;
  //increase progressBar
  let percent = (questionCount + 1) * 10;
  document.querySelector(".progressBar").style.width = `${percent}%`;
  //check to see if we're going to be on the final question
  if (questionCount == 9) {
    //update the button
    document.getElementById("submit").innerText = "Submit and get results";
  }
  //check to see if there are no more questions
  if (questionCount == 10) {
    displayResults();
    //will display socre modal as soon as final answer is submitted.
    document.getElementById("submit").setAttribute("data-toggle", "modal");
    document
      .getElementById("submit")
      .setAttribute("data-target", "#scoreModal");
    //returning so that "displayQandA" will not run as there are no more questions.
    return;
  }
  //otherwise display the next question
  displayQandA(questionCount);
}

function displayResults() {
  //hide quiz screen and progress bar
  document.querySelector("#quiz-container").style.display = "none";
  document.querySelector("#barContainer").style.display = "none";
  //display results
  document.querySelector("#results").style.display = "";
  //display questionsWrong arr.
  let wrongQuestionList = "";
  questionsWrong.forEach(function(wrongItem, index) {
    //destructuring the wrongItem object
    let { qNumber, userChoice } = wrongItem;
    //grabbing the correct answer from the orginal question array
    let correctAns = questions[qNumber].answer;
    //creating the HTML to display
    wrongQuestionList += `<div class="wrongItem">
      <p><strong>Q${qNumber + 1}. ${questions[qNumber].question}</strong></p>
      <p>You chose: <span class="wrongAns" style="color:red;">${
        questions[qNumber].options[userChoice - 1]
      }</span></p>
      <p>The correct answer was <span class="rightAns" style="color:green;"><strong>${
        questions[qNumber].options[correctAns - 1]
      }</strong></span></p>
    </div>`;
  });
  //if the user scored a 10/10, there's no need to display "CheckAnswers".
  if (userScore == 10) {
    document.getElementById("checkAnswerBtn").style.display = "none";
  }
  //sending the HTML to be displayed
  document.querySelector(".correctResults").innerHTML = wrongQuestionList;
  //display user Score
  document.getElementById(
    "userScore"
  ).innerText = `You scored ${userScore}/10!`;
  //display grade.
  displayUserGrade(userScore);
  //highscore
  checkHighscore(userScore);
  document.getElementById(
    "userHighScore"
  ).innerText = `Your high score is ${userHighScore}`;
}

function displayUserGrade(userScore) {
  // init the grade message
  let grade = "";
  // check userScore and see which grade they should get
  if (userScore <= 3) {
    //if score is less than or equal to 3, grade becomes the below
    grade = "You need to do some study. Please try again";
  } else if (userScore <= 6) {
    //if score is less than or equal to 6, grade becomes the below
    grade = "There's room for improvement here. Keep at it!";
  } else if (userScore <= 9) {
    //if score is less than or equal to 9, grade becomes the below
    grade = "Great job! Can you get all ten correct?";
  } else {
    //otherwise user got a perfect score.
    grade = "Wow! Perfect score! Excellent Work!";
  }
  //  set the userGrade element to equal the "grade" message
  document.getElementById("userGrade").innerText = grade;
}

function restartQuiz() {
  //set styles and scores (apart from highscore) back to defaults
  document.querySelector("#results").style.display = "none";
  document.querySelector(".quiz-start").style.display = "";
  document.getElementById("submit").innerText = "Next";
  //removes the "display modal" classes from button
  document.getElementById("submit").removeAttribute("data-toggle");
  document.getElementById("submit").removeAttribute("data-target");
  userScore = 0;
  questionCount = 0;
  questionsWrong = [];
}

function checkHighscore(userScore) {
  //condition ? true : false
  //does the current user score beat the current high score? If yes, set highscore to be user score, if not, ignore.
  userScore > userHighScore ? (userHighScore = userScore) : null;
}
