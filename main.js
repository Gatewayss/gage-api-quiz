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
const backBtn = document.getElementById("back-button")
const submitBtn = document.getElementById("submit")
const input = document.querySelector("input")
const scoreList = document.getElementById("score-list")
const questionButtons = [btn1, btn2, btn3, btn4]

let newQuestion;
let correct;
let currentScore = 0;
let counterBegun;
let timeLeft;
let count = 0;
let currentQuestionIndex = 0;
let userWon = false;

// submit button TODO:
//const array = [1, 2, 3, 4, 5, 6, 7];
// push puts new at the end and the render that 
//string, parse 
//console.log(array.slice(-3));  // Output: [5, 6, 7]

submitBtn.addEventListener('click', scorePageDisplay)
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
//back button to navigate between questions only
backBtn.addEventListener("click", () => {
    currentQuestionIndex--;
    renderQuestion()
}
)
// exit button to bring you back to homepage 
exitBtn.addEventListener("click", () => {
    currentScore = 0;
    score.textContent = currentScore;
    currentQuestionIndex = 0;
    counterBegun = false;
    $('#loser').toggleClass('hidden')
    $('#welcomeBox').toggleClass('hidden')
})

function scorePageDisplay(event) {
    $('div#winner-container').toggleClass('hidden')
    $('div.score-board').toggleClass('hidden')
    localStorage.getItem('userScores')
    let userScores = []
    userScores.push({ initials: input.value, score: currentScore });
    let li = document.createElement("li");
    li.textContent = `Initial: ${input.value} Score:${currentScore}`;
    localStorage.setItem('userScores', input.value + ' ' + currentScore)
    scoreList.appendChild(li);
    event.preventDefault()
}
//}

// start quiz function 
function startQuiz() {
    counterBegun = true;
    if (counterBegun === true) {
        startCounter()
    }
    $('#welcomeBox').toggleClass('hidden')
    $('#quiz').toggleClass('hidden')
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
    count = 10
    let timeLeft = setInterval(function () {
        count--;
        counter.textContent = count
        if (count === 10) {
            $('span#counter').css('color', 'red')
        }
        if (count <= 0) {
            clearInterval(timeLeft)
            counter.textContent = 0;
            userLost()
        }
        if (counterBegun === false) {
            counter.textContent = 0;
            $('#welcomeBox').toggleClass('hidden')
            $('#quiz').toggleClass('hidden')
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
        $('#quiz').toggleClass('hidden')
        $('#loser').toggleClass('hidden')
    }
}

function winnerPage() {
    score2.textContent = currentScore;
    $('#quiz').toggleClass('hidden')
    $('div#winner-container').toggleClass('hidden')
    $('#loser').toggleClass('visible')
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
figure out how to reset the quiz efficiently,
fix the last question buttons, 
create a high score page,
hide the back and next button ^,
figure out local storage to save score
clean the code 
*/