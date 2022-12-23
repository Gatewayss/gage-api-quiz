const startBtn = document.querySelector("button")
const welcomeBox = document.getElementById("welcomeBox")
const quiz = document.getElementById("quiz")
const counter = document.getElementById("counter")
const loser = document.getElementById("loser")
const quitBtn = document.getElementById("quit-button")
const question = document.getElementById("question")
const exitBtn = document.getElementById("exit-button")
const nextBtn = document.getElementById("next-button")
const score = document.getElementById("score")
const questionButtons = [btn1, btn2, btn3, btn4]
questionButtons.forEach(btn => btn.addEventListener("click", answerCheck));

let newQuestion;
let correct;
let currentScore = 0;
let counterBegin;
let timeLeft;
let count = 0;
let currentQuestionIndex = 0;

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    renderQuestion()
    console.log(currentQuestionIndex);
}
)


exitBtn.addEventListener("click", () => {
    loser.classList.add("hidden")
    loser.classList.remove("visible")
    welcomeBox.classList.remove('hidden')
    welcomeBox.classList.add('visible')
})

startBtn.addEventListener("click", startQuiz)
quitBtn.addEventListener("click", () => {
    return counterBegin = false
});

function answerCheck(event) {
   correct = newQuestion.answer
    console.log(correct);
    if (event.target.textContent === correct) {
        currentScore++
        event.target.style.backgroundColor = "green"
        score.textContent = currentScore;
    } else if (event.target.textContent !== correct) {
        event.target.style.backgroundColor = "red"
        console.log("wrong");
    }
}

function startQuiz() {
    counterBegin = true
    if (counterBegin === true) {
        startCounter()
    }
    welcomeBox.classList.remove('visible')
    welcomeBox.classList.add('hidden')
    quiz.classList.remove('hidden');
    quiz.classList.add('visible');
    renderQuestion()
}

/* new question take the current index of questions and displays
curButton creates the id fo the answer button and then increments it 
by the length of the array with for each */
function renderQuestion() {
    newQuestion = questionArray[currentQuestionIndex]
    question.textContent = newQuestion.question
    let idx = 1;
    let curButton;
    let newButton;
    newQuestion.options.forEach(function (options) {
        curButton = "btn" + idx;
        newButton = document.getElementById(curButton);
        newButton.textContent = options;
        idx++;
    }
    )
    return newQuestion
}

function startCounter() {
    count = 60
    let timeLeft = setInterval(function () {
        count--;
        counter.textContent = count
        if (count === 10) {
            counter.style.color = "red"
        }
        if (count === 0) {
            clearInterval(timeLeft)
            userLost()
        }
        if (counterBegin === false) {
            counter.textContent = 0;
            welcomeBox.classList.remove('hidden')
            welcomeBox.classList.add('visible')
            quiz.classList.remove('visible');
            quiz.classList.add('hidden');
            loser.classList.add("hidden")
            return clearInterval(timeLeft)
        }
    }, 1000);
}

function userLost() {
    quiz.style.display = 'none'
    quiz.classList.add('visible');
    loser.classList.add('visible')
    loser.classList.remove('hidden')
}


let questionArray = [
    {
        question: "Which TV show has the largest trans cast in history",
        options: ["Pose", "Euphoria", "Queer eye", "Grey's anatomy "],
        answer: "Pose"
    },
    {
        question: "Who designed the first transgender flag?",
        options: ["Sylvia Rivera", "Miss Major Griffin-Gracy", "Monica Helms", "Stormé DeLarverie"],
        answer: "Monica Helms"
    }
];


/* TODO: 
create questions and answers,
put those in a object, 
make a next button,
use text content to change the test after each question after clicking on the next content,
have the answers set to true or false and display
them if user gets them right and add to score,
create the count down,
if they get a question wrong subtract time 
create the score that updates,

create a finish page 
create a high score page 
figure out local storage to save score
*/