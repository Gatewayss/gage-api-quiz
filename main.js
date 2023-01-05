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

// start button
startBtn.addEventListener("click", startQuiz);

// submit button
submitBtn.addEventListener('click', scorePageDisplay);

// renders a click event for each answer button so they can be checked   
questionButtons.forEach(btn => btn.addEventListener("click", answerCheck));

// quit button restarts application
quitBtn.addEventListener("click", () => {
    location.reload()
});

// next button
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    renderQuestion()
});

//back button to navigate between questions only
backBtn.addEventListener("click", () => {
    currentQuestionIndex--;
    renderQuestion()
});

// exit button restarts application
exitBtn.addEventListener("click", () => {
    currentScore = 0;
    score.textContent = currentScore;
    currentQuestionIndex = 0;
    counterBegun = false;
    $('#loser').toggleClass('hidden')
    $('#welcomeBox').toggleClass('hidden')
});

// start quiz function 
function startQuiz() {
    counterBegun = true;
    if (counterBegun === true) {
        quizCounter()
    }
    $('#welcomeBox').toggleClass('hidden')
    $('#quiz').toggleClass('hidden')
    renderQuestion()
};

/* new question takes the current question index,
idx increments by 1 and is added to the current button 
so that each button is updated to the current question */
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
        })
        return newQuestion
    }
};

// check answer, add points, subtract time and changes color if true or false
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

};

/* disables the click function on the correct answer button so that the user cannot keep scoring points by clicking it */
function restartCorrectAnswer() {
    questionButtons.forEach(btn => btn.disabled = false);
};

// counter function 
function quizCounter() {
    count = 60
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
};

/* score page display where new quit button is rendered 
and local storage is saved and display */
function scorePageDisplay(event) {
    $('div#winner-container').toggleClass('hidden')
    $('div.score-board').toggleClass('hidden')
    const scoreQuitButton = $('<button type="button" class="nav-buttons score-board-quit" id="quit-button">QUIT</button>')
    scoreQuitButton.on('click', function() {
        location.reload()
      });
    $('div.score-board').append(scoreQuitButton)
    userScores = []
    userScores.push({ initials: input.value, score: currentScore });
    let li = document.createElement("li");
    li.textContent = `initial: ${input.value} score: ${currentScore}`;
    localStorage.setItem('user score info:', `initials: ${input.value} score: ${currentScore}`)
    scoreList.appendChild(li);
    event.preventDefault()
};

// loser page display  
function userLost() {
    if (userWon) {
        return;
    } else {
        $('#quiz').toggleClass('hidden')
        $('#loser').toggleClass('hidden')
    }
};

// winner page display 
function winnerPage() {
    score2.textContent = currentScore;
    $('#quiz').toggleClass('hidden')
    $('div#winner-container').toggleClass('hidden')
    $('#loser').toggleClass('visible')
};

// questions, options and answers object
let questionArray = [
    {
        question: "which TV show has the largest trans cast in history?",
        options: ["Pose", "Euphoria", "Queer eye", "Grey's anatomy "],
        answer: "Pose"
    },
    {
        question: "who designed the first transgender pride flag?",
        options: ["Sylvia Rivera", "Miss Major Griffin-Gracy", "Monica Helms", ],
        answer: "Monica Helms"
    },
    {
        question: "america’s first transgender statue honors which activists from the Stonewall Riots in 1969?",
        options: ["Marsha P Johnson", "Sylvia Rivera", "Stormé DeLarverie", "Marsha P Johnson and Sylvia Rivera"],
        answer: "Marsha P Johnson and Sylvia Rivera"
    },
    {
        question: "which city in the united states was the first to pass trans-inclusive legislation?",
        options: ["minneapolis", "san francisco", "portland", "miami"],
        answer: "minneapolis"
    },
    {
        question: "which transgender man pioneered the use of x-ray photography to detect tuberculosis?",
        options: ["lou Sullivan", "elliot page", "alan hart", "billy tipton"],
        answer: "alan hart"
    }
];