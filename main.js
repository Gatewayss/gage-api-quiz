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
const score2 = document.getElementById("score2")
const winner = document.getElementById("winner-container")
const questionButtons = [btn1, btn2, btn3, btn4]

let newQuestion;
let correct;
let currentScore = 0;
let counterBegun;
let timeLeft;
let count = 0;
let currentQuestionIndex = 0;
let userWon = false;


// start button
startBtn.addEventListener("click", startQuiz)
// answer check for each button
questionButtons.forEach(btn => btn.addEventListener("click", answerCheck));
// quit button that takes you back to homepage
quitBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    counterBegun = false;
    score.textContent = currentScore;
    currentScore = 0;
});
// next button for the next questions
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    renderQuestion()
}
)
// exit button to bring you back to homepage 
exitBtn.addEventListener("click", () => {
    currentScore = 0;
    score.textContent = currentScore;
    currentQuestionIndex = 0;
    counterBegun = false;
    loser.classList.add("hidden")
    loser.classList.remove("visible")
    welcomeBox.classList.remove('hidden')
    welcomeBox.classList.add('visible')
})

// start quiz function 
function startQuiz() {
    counterBegun = true;
    if (counterBegun === true) {
        startCounter()
    }
    welcomeBox.classList.remove('visible')
    welcomeBox.classList.add('hidden')
    quiz.classList.remove('hidden');
    quiz.classList.add('visible');
    renderQuestion()
}

// check answer and change color if true or false
function answerCheck(event) {
    correct = newQuestion.answer
    console.log(correct);
    if (event.target.textContent === correct) {
        currentScore++
        event.target.classList.add("correct-choice")
        score.textContent = currentScore;
        event.target.disabled = true;
    } else if (event.target.textContent !== correct) {
        event.target.classList.add("wrong-choice")
        count = count - 10
    }

}/* answer check disables to correct answer button so that 
the user cannot keep scoring points, this resets it back to being clickable */
function restartCorrectAnswer() {
    questionButtons.forEach(btn => btn.disabled = false);
}

/* new question take the current index of questions and displays
curButton creates the id fo the answer button and then increments it 
by the length of the array with for each */
function renderQuestion() {
    if (currentQuestionIndex === 5) {
        winnerPage()
        return userWon = true
    } else {
        restartCorrectAnswer()
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
            questionButtons.forEach(btn => btn.classList.remove("correct-choice"));
            questionButtons.forEach(btn => btn.classList.remove("wrong-choice"));
        }
        )
        return newQuestion
    }
}
// start counter function 
function startCounter() {
    count = 20
    let timeLeft = setInterval(function () {
        count--;
        counter.textContent = count
        if (count === 10) {
            counter.style.color = "red"
        }
        if (count <= 0) {
            clearInterval(timeLeft)
            counter.textContent = 0;
            userLost()
        }
        if (counterBegun === false) {
            counter.textContent = 0;
            welcomeBox.classList.remove('hidden')
            welcomeBox.classList.add('visible')
            quiz.classList.remove('visible');
            quiz.classList.add('hidden');
            loser.classList.add("hidden")
            return clearInterval(timeLeft)
        }
        if (userWon) {
            count = 0;
            counter.textContent = 0;
            return clearInterval(timeLeft)
        }
    }, 1000);
}

// user lost page displayed 
function userLost() {
    if (userWon) {
        return;
    } else {
        quiz.classList.remove('visible')
        quiz.classList.add('hidden')
        loser.classList.add('visible')
        loser.classList.remove('hidden')
    }
}

function winnerPage() {
    score2.textContent = currentScore;
    quiz.classList.remove('visible')
    quiz.classList.add('hidden')
    winner.classList.remove('hidden')
    winner.classList.add('visible')
    loser.classList.add('hidden')
    loser.classList.remove('visible')
}
// question obj
let questionArray = [
    {
        question: "which TV show has the largest trans cast in history?",
        options: ["Pose", "Euphoria", "Queer eye", "Grey's anatomy "],
        answer: "Pose"
    },
    {
        question: "who designed the first transgender pride flag?",
        options: ["Sylvia Rivera", "Miss Major Griffin-Gracy", "Monica Helms", "Stormé DeLarverie"],
        answer: "Monica Helms"
    },
    {
        question: "america’s first transgender statue celebrates and honors which activists from the Stonewall Riots?",
        options: ["Marsha P Johnson", "Sylvia Rivera", "name", "Marsha P Johnson and Sylvia Rivera"],
        answer: "Marsha P Johnson and Sylvia Rivera"
    },
    {
        question: "which city in the united states was the first to pass trans-inclusive legislation?",
        options: ["minneapolis", "san francisco", "portland", "miami"],
        answer: "minneapolis"
    },
    {
        question: "true or false: a transgender man pioneered the use of x-ray photography to detect tuberculosis.",
        options: ["yes", "no"],
        answer: "yes"
    }
];


/* TODO: 
update questions and answers,
if they get a question wrong subtract time 
figure out how to reset the quiz efficiently,
fix the last question button, 
add event listener so that when the quiz is over 
it shows the winner page,
create a finish page 
figure out local storage to save score
*/