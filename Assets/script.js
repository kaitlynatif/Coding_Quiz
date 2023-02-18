//declare the variables needed to access all relevant elements from the html
var timerDisplay = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var quizBox = document.querySelector(".quizBox");
var myButton = document.querySelector(".myButton");
var highScore = document.querySelector(".highScore");
var answerOptions = document.querySelector(".answerButtons");
var result = document.querySelector("#result");
var score = document.querySelector("#score");
var gameOverScreen = document.querySelector(".gameOver");

//set current index for questions to zero, set wins to zero
var currentIndex = 0;
var wins = 0;

//Create button, add css styling via class, and append them
var option1 = document.createElement("button");
var option2 = document.createElement("button");
var option3 = document.createElement("button");
var option4 = document.createElement("button");

option1.classList.add("btn");
option2.classList.add("btn");
option3.classList.add("btn");
option4.classList.add("btn");

answerOptions.appendChild(option1);
answerOptions.appendChild(option2);
answerOptions.appendChild(option3);
answerOptions.appendChild(option4);


//onloading page, this function will be called
function rulesFirst() {
     //create p element to hold rules, append it to quizBox
     var rulesFirst = document.createElement("p");
     rulesFirst.setAttribute("style", "margin-bottom: 10px");
     rulesFirst.setAttribute("id", "rulesFirst");
     rulesFirst.textContent = "Try to answer the following Javascript related questions within the time limit. Keep in mind that incorrect answers will substract 5 seconds from the timer!";
     quizBox.appendChild(rulesFirst);
     //create start button, append it to quizBox and add click event
     var startButton = document.createElement("button");
     startButton.innerHTML = "Start Quiz";
     startButton.setAttribute("id", "startButton");
     //add styling to button using existing class in CSS
     startButton.classList.add("btn");
     myButton.appendChild(startButton);
     startButton.addEventListener("click", startQuiz);

}


//Set countdown timer to 45 seconds, start countdown function
var timeLeft = 45;
function updateTimer() {
     timerInterval = setInterval(function () {
//when timer reaches zero, clear interval function and display game over
        if (timeLeft === 0) {
               clearInterval(timerInterval);
               gameOver();
          } else {
          timeLeft--;
          timerDisplay.textContent = timeLeft + " seconds left";
          }
     }, 1000);
}

//function to clear display and display game over when timer runs out or questions are finished
function gameOver() {
   timerDisplay = '';
    var gameOver = document.createElement("p");
    var yourScore = document.createElement("p");
    var inputWhat = document.createElement("span");
    var userInput = document.createElement("input");
    var submitButton = document.createElement("button");

    submitButton.classList.add("btn");

     userInput.type = "text";
     userInput.value = "";
     userInput.classList.add("userInput");

     gameOver.textContent = "Game Over!"
     yourScore.textContent = "Your final score is: " + wins;
     inputWhat.textContent = "Enter initials: ";
     submitButton.innerHTML = "Submit";

    gameOverScreen.appendChild(gameOver);
    gameOverScreen.appendChild(yourScore);
    gameOverScreen.appendChild(inputWhat);
    gameOverScreen.appendChild(userInput); 
    myButton.appendChild(submitButton);


    submitButton.addEventListener("click", function (event){
         event.preventDefault();
         if (userInput.value.length === 0) {
              alert("Please enter initials before submitting");
         } else {

         localStorage.setItem("name", userInput.value);
         localStorage.setItem("score", wins);
         window.location.href = "highscore.html";
         }
    });

     answerOptions.remove();
     quizBox.remove();
}


//function to start quiz
function startQuiz() {
     //start timer, remove the rules and start button created earlier
   updateTimer();
   var rules = document.querySelector("#rulesFirst");
   rules.remove();
   var startButton = document.querySelector("#startButton");
   startButton.remove();
   //call function that will call the questions
   getQuestion();
}

//function to go through all the questions
function getQuestion () {
      currentQuestion = theQuestions[currentIndex];
      quizBox.textContent = currentQuestion.question;

      //make answer buttons visible, add text content and click event
     answerOptions.classList.remove("visibility");

     option1.textContent = currentQuestion.choice1;
     option2.textContent = currentQuestion.choice2;
     option3.textContent = currentQuestion.choice3;
     option4.textContent = currentQuestion.choice4;

     option1.addEventListener("click", selectAnswer);
     option2.addEventListener("click", selectAnswer);
     option3.addEventListener("click", selectAnswer);
     option4.addEventListener("click", selectAnswer);
        }


//function to be called when answer buttons are clicked
function selectAnswer (event) {
     //set variable for the current target of the click event
   var clicked = event.currentTarget.textContent;

   if (clicked === currentQuestion.answer) {
        result.textContent = "Correct Answer!";
        wins++;
        score.textContent = "Score: " + wins;
   }   
   else {
        result.textContent = "Wrong answer!";
        timeLeft -= 5;
   }
   //if statement to stop looping through questions and end game if all questions have been looped through
   if (currentIndex === theQuestions.length - 1) {
      //gameOver();
      timeLeft = 0
   } 
   else {
        currentIndex++
        getQuestion()
   }

}

//Created variable which is array of all questions and answers
     var theQuestions = [
     {question: "Which of the following will write the message ‘Hello world!’ in an alert box?",
      choice1: "alertbox(Hello world!);",
      choice2: "alertnow(Hello world!);",
      choice3: "alert(“Hello world!”);",
      choice4: "giveAlert('Hello world!')",
      answer: "alert(“Hello world!”);"
     },
     {question: "Which if statement will execute code if the value of x is equal to 5?",
      choice1: "If (x === 5) {}",
      choice2: "If x = 5 {}",
      choice3: "If (x!= 5) {}",
      choice4: "If (x, 5) {}",
      answer: "If (x === 5) {}"
     },
     {question: "What does ParseInt() do?",
     choice1: "Changes a given variable into an integer value", 
     choice2: "Changes a given variable into a string", 
     choice3:"Changes a given variable into an array", 
     choice4: "Changes a given array into a string",
     answer: "Changes a given variable into an integer value"
     },           
     {question: "How do you write a ‘logical or’ in Javascript code?",
     choice1: "//",
     choice2: "$$",
     choice3: "%",
     choice4: "||",
     answer: "||"
     },             
     {question: "Which of the following functions of String object returns the character at the specified index?",
     choice1: "substri()",
     choice2: "indexOf()",
     choice3: "charAt()",
     choice4: "forEach()",
     answer: "charAt()"
     }             
     ];



rulesFirst ();