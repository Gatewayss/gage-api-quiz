const startBtn = document.querySelector("button")
const welcomeBox = document.getElementById("welcomeBox")
const quiz = document.getElementById("quiz")
console.log(welcomeBox);


startBtn.addEventListener("click", startQuiz)

function startQuiz() {
    welcomeBox.style.display = 'none';
    quiz.setAttribute('style', "visibility: visible;")
  }


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