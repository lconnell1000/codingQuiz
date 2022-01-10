const startGameBtnEl = document.querySelector("#startButton");
const qAndAEl = document.querySelector("#qAndAns");
const introEl = document.querySelector("#introPage");
const timerEl = document.querySelector("#timer");
const initialsEl = document.querySelector("#intials");
const submitEl = document.querySelector("#submit");
const hSContainerEl = document.querySelector("#hSContainer");
const finalScoreEl = document.querySelector("#final");
const quizQuestionsEl = document.querySelector("#questions");
const answerEl = document.querySelector("#answers");
const chosenAnswer = Array.from(document.getElementsByClassName("chosenAnswer"));
const correctEl = document.querySelector("#correct");
const incorrectEl = document.querySelector("#incorrect");
const containerEl = document.querySelector(".containter");
const leaderboardEl = document.querySelector(".high-score");

let currentQIndex = "";
let currentQ = "";
let score = 0;
let prevHighScore = "";

//need to have all of our possible questions in an array

let myQuizQuestions = [
    {
        question: "What is CSS commonly used for?",
        answer1: "To make a webpage from start to finish",
        answer2: "To style a webpage",
        answer3: "To make a webpage interactive",
        answer4: "To make a webpage have multiple pages",
        correct: 2

    },
    {
        question: "What is a variable?",
        answer1: "an unkown character",
        answer2: "something that can always change",
        answer3: "Variables are used to store information",
        answer4: "a special character",
        correct: 3
    },
    {
        question: "How can you make a comment in javascript?",
        answer1: "//comment",
        answer2: "'comment''",
        answer3: "*/comment*/",
        answer4: "comment",
        correct: 1
    },
    {
        question: "What extension should a html file be?",
        answer1: ".css",
        answer2: ".ht'",
        answer3: ".h",
        answer4: ".html",
        correct: 4
    },
    {
        question: "Bootstap is a library for which language??",
        answer1: "HTML",
        answer2: "Javascript'",
        answer3: "CSS",
        answer4: "C++t",
        correct: 3
    },
    {
        question: "Jquery is a library for which language?",
        answer1: "HTML",
        answer2: "Javascript",
        answer3: "CSS",
        answer4: "C++",
        correct: 2
    },
]


var timeInterval = "";
var timerCount = 60;

//when user clicks the start button need to display first question and start the 
//timer to count down
startGameBtnEl.addEventListener("click", startQuiz)

//makes the user sumbit their Initials
initialsEl.addEventListener("keyup", function () {
    submitEl.disabled = !initialsEl.value;
})

//make our highscores into an object
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
//creating our list of high scores
submitEl.addEventListener("click", function (event) {
    event.preventDefault();
    const allScores = {
        score: prevHighScore,
        initials: initialsEl.value,
    }
    //make high scores into an array
    highScore.push(allScores);


    //sort the highscores into a list in order of highest to lowest
    highScore.sort(function(a,b){
        return b.score - a.score
    })

    //now turn the highscores back into a string with json which will make it easy
    //to display on our highscores page
    localStorage.setItem("highScore", JSON.stringify(highScore));
    //this next line is to take you to that page once the submit button is pressed
    location.assign("highScore.html");
})


//function below is for the quiz to actually start
function startQuiz(){
    if (qAndAEl.display == "none") {
        qAndAEl.setAttribute("style", "display:none");
        introEl.setAttribute("style", "display:block");
    }
    else {
        qAndAEl.setAttribute("style", "display:block");
        introEl.setAttribute("style", "display:none");
    }
    //now need to set our timer to show how long is left with a text content
    timeInterval = setInterval(function (){
        //if the user is still answering questions with time remaining
        if (timerCount >= 1) {
            timerEl.textContent = "Time Remaining: " + timerCount;
            timerCount--;
        }
        //and if the time has reached 0 we need to remove the q's & a's, clear time interval
        //display the high scores container 
        else {
            timerEl.textContent = "Time Remaining: " + timerCount;
            clearInterval(timeInterval);
            hSContainerEl.setAttribute("style", "display:block");
            qAndAEl.setAttribute("style", "disaply:none");
            score = 0;
            localStorage.setItem("latestScore", score);
            prevHighScore = localStorage.getItem("latestScore")
            finalScoreEl.innerText = prevHighScore;
        }
    }, 1000);
    currentQIndex = 0;
    loadQuizQuestions();
}

function loadQuizQuestions() {
    //if no further questions then need to go final page and display high scores
    //containter
    if (currentQIndex == myQuizQuestions.length) {
        hSContainerEl.setAttribute("style", "display:block");
        qAndAEl.setAttribute("style", "display:none");
        timerEl.textContent = "Time Remaining: " + timerCount;
        clearInterval(timeInterval)
        return
    };

    //now we need to pick a question from our array of questions 
    currentQ = myQuizQuestions[currentQIndex]
    quizQuestionsEl.innerText = currentQ.question;

    

    //now we allocate our correct answer from the array to match the data number
   
    chosenAnswer.forEach((chosen) => {
        var answer = chosen;
        var number = answer.dataset["number"];
        answer.innerText = currentQ["answer" + number];
    })
    //now increase the index by 1 each time so that the next question shows up
    currentQIndex = currentQIndex + 1;

}

//the function below is for when an answer is clicked from the array, each time it
//has been clicked it will run again and be on the next question 

function questionAnswered(){

    chosenAnswer.forEach((click) => {
        var answer = click;
        answer.addEventListener("click", function(k){
            var selectedOption = k.target;
            var selectedAnswer = selectedOption.dataset["number"];
   
            //now need to check wether the quiz had more than 10 seconds remaining if an answer
            //was incorrect so that we end the quiz there
            if (selectedAnswer != currentQ.correct && timerCount > 10){
                timerCount -= 10;
            } else if (selectedAnswer != currentQ.correct && timerCount <= 10 ) {
                timerCount = 0
            } else {
                timerCount--
            }

            //now when we need to show the user if their last answer
            //was correct or incorrect
            if (selectedAnswer == currentQ.correct) {
                correctEl.setAttribute("style", "display:block");
                setInterval(function(){
                    correctEl.setAttribute("style", "display:none")
                }, 2500)
            }
            else {
                incorrectEl.setAttribute("style", "display:block");
                setInterval(function(){
                    incorrectEl.setAttribute("style", "display:none");
                }, 2500)
            }
            loadQuizQuestions()

            //the score will be recorded as the time left when the last question was answered (when the my
            //quizquestions array now has no further questions in it) as we have already told it to record the score as 0 if the quiz is not completed
            if (currentQIndex === myQuizQuestions.length) {
                score = timerCount;
            }

            localStorage.setItem("latestScore", score);
            prevHighScore = localStorage.getItem("latestScore");
            finalScoreEl.innerText = prevHighScore;
        })
    })
}

questionAnswered();