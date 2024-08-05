 /* jshint esversion: 11 */
// wait for the DOM to finish loading before running the game 
// Get the button elements and ass event listerners to them 
document.addEventListener("DOMContentLoaded", function() {
    const optionButtons = document.querySelectorAll(".option");
    for (let button of optionButtons) {
        button.addEventListener("click", function() {
            checkAnswer(parseInt(this.getAttribute("data-index")));
        });
    }

    document.getElementById("next").addEventListener("click", nextQuestion);
    document.getElementById("restart").addEventListener("click", restartQuiz);
    document.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);

    // Initialize with random questions
    questions = getRandomQuestions(allQuestions, 5);
});



let questions;
let currentQuestion = 0;
let score = 0;

/**
 * Starts the quiz by hiding the welcome screen and showing the quiz screen
 */
function startQuiz() {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
}

/**
 * Loads the current question and options into the quiz
 */
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');

    questionElement.textContent = questions[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
        option.style.backgroundColor = "#0056b3"; // Darker blue
        option.disabled = false;
    });

    document.getElementById('next').classList.add('hidden');
}

/**
 * Checks if the selected answer is correct and updates the score
 */
function checkAnswer(selectedOption) {
    const options = document.querySelectorAll('.option');
    if (selectedOption === questions[currentQuestion].answer) {
        options[selectedOption].style.backgroundColor = "#1e7e34"; // Darker green
        score++;
    } else {
        options[selectedOption].style.backgroundColor = "#dc3545"; // Red
        options[questions[currentQuestion].answer].style.backgroundColor = "#1e7e34"; // Darker green
    }
    options.forEach(option => option.disabled = true);
    document.getElementById('next').classList.remove('hidden');
}

/**
 * Loads the next question or shows the result if the quiz is finished
 */
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

/**
 * Displays the final score
 */
function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    let scoreMessage = `You scored ${score} out of ${questions.length}.`;
    if (score === questions.length) {
        scoreMessage += " 🎉 Congratulations! 🎉";
    } else {
        scoreMessage += " Try again by clicking the restart button.";
    }
    document.getElementById('score-message').textContent = scoreMessage;
}

/**
 * Restarts the quiz with a new set of random questions
 */
function restartQuiz() {
    questions = getRandomQuestions(allQuestions, 5);
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    loadQuestion();
}

/**
 * Returns a random subset of questions
 */
function getRandomQuestions(array, num) {
    let shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}