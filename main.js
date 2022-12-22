const startBtn = document.querySelector("button")
const welcomeBox = document.getElementById("welcomeBox")
const quiz = document.getElementById("quiz")
const counter = document.getElementById("counter")
const loser = document.getElementById("loser")
const quitBtn = document.getElementById("quit-button")

let count = 5;


function startQuiz() {
    startCounter()
    welcomeBox.classList.remove('visible')
    welcomeBox.classList.add('hidden')
    quiz.classList.remove('hidden');
    quiz.classList.add('visible');
}

function startCounter() {
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
    }, 1000);
}

function userLost() {
    quiz.style.display = 'none'
    quiz.classList.add('visible');
    loser.classList.add('visible')
    loser.classList.remove('hidden')
}

let questions = [
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