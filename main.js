const startBtn = document.querySelector("button")
const welcomeBox = document.getElementById("welcomeBox")
const quiz = document.getElementById("quiz")
console.log(welcomeBox);

startBtn.addEventListener("click", startQuiz)

function startQuiz() {
    welcomeBox.style.display = 'none';
  }