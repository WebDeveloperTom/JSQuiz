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
//TODO
//rating system.
//login form/form validation -> name email password
// restart quiz button
//progress bar?
//if highscore is beaten, display a congratz message
//fix for offline mode.

//Keeping track of the current question count
let questionCount = 0;
//The users current score.
let userScore = 0;
// The object containing all the questions the user has got wrong.
let questionsWrong = [];
//The users highest quiz score for this session.
let userHighScore = 0;

function startQuiz() {
  //hide the start quiz button and display the quiz
  document.querySelector(".quiz-start").style.display = "none";
  document.querySelector("#quiz-container").style.display = "";
  //fetches current question and displays
  displayQandA(questionCount);
}

function displayResults() {
  //display user's name
  //hide quiz screen
  document.querySelector("#quiz-container").style.display = "none";
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
    wrongQuestionList += `<div>
      <p>Q${qNumber + 1}. ${questions[qNumber].question}</p>
      <p>You chose: <span class="wrongAns" style="color:red;">${
        questions[qNumber].options[userChoice - 1]
      }</span></p>
      <p>The correct answer was <span class="rightAns" style="color:green;">${
        questions[qNumber].options[correctAns - 1]
      }</span></p>
    </div>`;
  });
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
  //try again button
}

function displayUserGrade(x) {
  let grade = "";
  if (x <= 3) {
    grade = "You need to do some study. Please try again";
  } else if (x <= 6) {
    grade = "There's room for improvement here. Keep at it!";
  } else if (x <= 9) {
    grade = "Great job! Can you get all ten correct?";
  } else {
    grade = "Wow! Perfect score! Excellent Work!";
  }
  document.getElementById("userGrade").innerText = grade;
}

function updateQandA() {
  //remove any warning responses
  document.getElementById("response").innerHTML = "";
  //increase the question count
  questionCount++;
  //check to see if we're going to be on the final question
  if (questionCount == 9) {
    //update the button
    document.getElementById("submit").innerText = "Submit and get results";
  }
  //check to see if there are no more questions
  if (questionCount == 10) {
    displayResults();
    return;
  }
  //otherwise display the next question
  displayQandA(questionCount);
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
    // document.getElementById("score").innerText = userScore;
    //update the question
    updateQandA();
  }
}

function displayQandA(x) {
  //takes in a value and fetches and display the value's question and choices.
  document.querySelector(".question").innerText = `${x + 1}. ${
    questions[x].question
  }`;
  let choices = "";
  //loops over each answer in the array and creates a radio button for each
  questions[x].options.forEach(function(option, index) {
    choices += `<input type='radio' name='options' value="${index +
      1}">${option}<br>`;
  });
  document.getElementById("answerList").innerHTML = choices;
}

function checkHighscore(userScore) {
  //condition ? true : false
  userScore > userHighScore ? (userHighScore = userScore) : null;
}
