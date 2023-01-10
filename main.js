const startBtn = document.querySelector("button")
const homepage = document.getElementById("homepage")
const timer = document.getElementById("timer")
const quitBtn = document.getElementById("quit-button")
const quizQuestion = document.getElementById("question")
const exitBtn = document.getElementById("exit-button")
const nextBtn = document.getElementById("next-button")
const score = document.getElementById("score")
const finalScore = document.getElementById("final-score")
const backBtn = document.getElementById("back-button")
const submitBtn = document.getElementById("submit")
const input = document.querySelector("input")
const scoreList = document.getElementById("score-list")
const audio = document.querySelector('audio')
const questionButtons = [btn1, btn2, btn3, btn4]
const allButtons = document.querySelectorAll('button')

let userScores = [];
let newQuestion;
let correct;
let currentScore = 0;
let counterBegun;
let timeLeft;
let currentTime = 0;
let currentQuestionIndex = 0;
let userWon = false;

// start button
startBtn.addEventListener("click", startQuiz);

// submit button
submitBtn.addEventListener('click', scorePageDisplay);

// renders a click event for each answer button to be checked if the chosen button is the correct answer or not  
questionButtons.forEach(btn => btn.addEventListener("click", answerCheck));

// quit button restarts application
quitBtn.addEventListener("click", () => {
    setTimeout(function() {
        window.location.reload();
     }, 200);
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

// exit button restarts application without reloading the browser 
exitBtn.addEventListener("click", () => {
    currentScore = 0;
    score.textContent = currentScore;
    currentQuestionIndex = 0;
    counterBegun = false;
    $('#timer').removeClass('timer-red')
    $('#loser-container').toggleClass('hidden')
    $('#homepage').toggleClass('hidden')
});

// plays the button clicks sound 
allButtons.forEach(btn => {
    btn.addEventListener("click", playSound);
  });

  function playSound() {
    audio.play();
  }

// starts the counter and renders the first question 
function startQuiz() {
    counterBegun = true;
    if (counterBegun === true) {
        quizTimer()
    }
    $('#homepage').toggleClass('hidden')
    $('#quiz-container').toggleClass('hidden')
    renderQuestion()
};

/* if the user hasn't won or lose a question will render, 
it sets the text of the quiz question element to the text of the current question,
along with the choices and or options of the current question, 
while refreshing the colors once a new question is rendered */
function renderQuestion() {
    if (currentQuestionIndex === 5 && currentScore === 0) {
        $('#quiz-container').toggleClass('hidden')
        $('#winner-container').toggleClass('hidden')
        userLostDisplay()
    } if (currentQuestionIndex === 5) {
        userWonDisplay()
        return userWon = true
    } else {
        restartCorrectAnswer()
        newQuestion = questionObj[currentQuestionIndex]
        quizQuestion.textContent = newQuestion.question
        let idx = 1;
        let curButton;
        let newButton;
        newQuestion.options.forEach(function (options) {
            curButton = "btn" + idx;
            newButton = document.getElementById(curButton);
            newButton.textContent = options;
            idx++;
            questionButtons.forEach(btn => btn.classList.remove("correct-answer"));
            questionButtons.forEach(btn => btn.classList.remove("wrong-answer"));
        })
        return newQuestion
    };
};

// check answer, add points, subtract time and changes colors if true or false
function answerCheck(event) {
    correct = newQuestion.answer
    if (event.target.textContent === correct) {
        currentScore++
        event.target.classList.add("correct-answer")
        score.textContent = currentScore;
        event.target.disabled = true;
    } else if (event.target.textContent !== correct) {
        event.target.classList.add("wrong-answer")
        currentTime = currentTime - 10
    }

};

/* disables the click function on the correct answer button so that the user cannot keep scoring points by clicking it */
function restartCorrectAnswer() {
    questionButtons.forEach(btn => btn.disabled = false);
};

// timer function 
function quizTimer() {
    currentTime = 60
    let timeLeft = setInterval(function () {
        currentTime--;
        timer.textContent = currentTime 
        if (currentTime <= 10) {
            $('#timer').addClass('timer-red')
        }
        if (currentTime  <= 0) {
            clearInterval(timeLeft)
            timer.textContent = 0;
            userLostDisplay()
        }
        if (counterBegun === false) {
            timer.textContent = 0;
            $('#homepage').toggleClass('hidden')
            $('#quiz-container').toggleClass('hidden')
            loser.classList.add("hidden")
            return clearInterval(timeLeft)
        }
        if (userWon) {
            currentTime = 0;
            timer.textContent = 0;
            return clearInterval(timeLeft)
        }
    }, 1000);
};

/* score page displays the user info and saves it to local storage */
function scorePageDisplay(event) {
    $('#winner-container').toggleClass('hidden')
    $('.score-container').toggleClass('hidden')
    let scoreQuitButton = $('.score-board-quit')
    scoreQuitButton.on('click', function () {
        location.reload()
    });
        userScores.push({ initials: input.value, score: currentScore });
        let li = document.createElement("li");
        li.textContent = `Initial: ${input.value} Score: ${currentScore}`;
        localStorage.setItem('user score info:', `initials: ${input.value} score: ${currentScore}`)
        scoreList.appendChild(li);
        event.preventDefault()
};

// loser page display  
function userLostDisplay() {
    if (userWon) {
        return;
    } else {
        $('#quiz-container').toggleClass('hidden')
        $('#loser-container').toggleClass('hidden')
    }
};

// winner page display 
function userWonDisplay() {
    finalScore.textContent = currentScore;
    $('#quiz-container').toggleClass('hidden')
    $('#winner-container').toggleClass('hidden')
    $('#loser').toggleClass('visible')
};

// questions, options and answers object
let questionObj = [
    {
        question: "Which TV show has the largest trans cast in history?",
        options: ["Pose", "Euphoria", "Queer Eye", "Grey's Anatomy"],
        answer: "Pose"
    },
    {
        question: "Who designed the first transgender pride flag?",
        options: ["Sylvia Rivera", "Miss Major Griffin-Gracy", "Caroline Cossey", "Monica Helms",],
        answer: "Monica Helms"
    },
    {
        question: "America’s first transgender statue honors which activists from the Stonewall Riots in 1969?",
        options: ["Marsha P Johnson", "Sylvia Rivera", "Stormé DeLarverie", "Marsha P Johnson and Sylvia Rivera"],
        answer: "Marsha P Johnson and Sylvia Rivera"
    },
    {
        question: "Which city in the united states was the first to pass trans-inclusive legislation?",
        options: ["Minneapolis", "San Francisco", "Portland", "Miami"],
        answer: "Minneapolis"
    },
    {
        question: "Which transgender man pioneered the use of x-ray photography to detect tuberculosis?",
        options: ["Lou Sullivan", "Elliot Page", "Alan Hart", "Billy Tipton"],
        answer: "Alan Hart"
    }
];