document.addEventListener("DOMContentLoaded", function() {
    let optionButtons = document.querySelectorAll(".option");
    for (let button of optionButtons) {
        button.addEventListener("click", function() {
            checkAnswer(parseInt(this.getAttribute("data-index")));
        });
    }

    document.getElementById("next").addEventListener("click", nextQuestion);
    document.getElementById("restart").addEventListener("click", restartQuiz);
    document.querySelector(".start-quiz-btn").addEventListener("click", startQuiz); // Ensure the start button has the correct event listener

    // Initialize with random questions
    questions = getRandomQuestions(allQuestions, 5);
});

/**
 * List of all possible questions and their corresponding options and answers
 */
let allQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        answer: 0
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: 2
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: 0
    },
    {
        question: "What year did the Titanic sink?",
        options: ["1905", "1912", "1918", "1923"],
        answer: 1
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
        answer: 2
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        answer: 2
    },
    {
        question: "What is the capital of Ireland?",
        options: ["Belfast", "Dublin", "Cork", "Galway"],
        answer: 1
    },
    {
        question: "What is the national symbol of Ireland?",
        options: ["Shamrock", "Rose", "Thistle", "Daffodil"],
        answer: 0
    },
    {
        question: "Which river is the longest in Ireland?",
        options: ["River Shannon", "River Liffey", "River Lee", "River Boyne"],
        answer: 0
    },
    {
        question: "What is the traditional Irish dish made from potatoes and cabbage called?",
        options: ["Colcannon", "Boxty", "Coddle", "Irish Stew"],
        answer: 0
    },
    {
        question: "Which famous Irish author wrote 'Ulysses'?",
        options: ["Oscar Wilde", "Samuel Beckett", "James Joyce", "W.B. Yeats"],
        answer: 2
    },
    {
        question: "What is the name of the famous cliff on the west coast of Ireland?",
        options: ["Cliffs of Moher", "Cliffs of Dover", "Cliffs of Slieve League", "Cliffs of Downpatrick"],
        answer: 0
    },
    {
        question: "What is the name of the traditional Irish sport played with a stick and ball?",
        options: ["Hurling", "Gaelic Football", "Rugby", "Cricket"],
        answer: 0
    },
    {
        question: "Which Irish saint is celebrated on March 17th?",
        options: ["Saint Patrick", "Saint Brigid", "Saint Columba", "Saint Kevin"],
        answer: 0
    },
    {
        question: "What is the currency used in Ireland?",
        options: ["Pound", "Euro", "Dollar", "Yen"],
        answer: 1
    },
    {
        question: "Which island lies off the coast of Galway and is known for its traditional Irish culture?",
        options: ["Aran Islands", "Achill Island", "Inishmore", "Valentia Island"],
        answer: 0
    },
    {
        question: "What is the name of the Irish festival held annually to celebrate literature, arts, and culture?",
        options: ["Puck Fair", "Bloomsday", "Lisdoonvarna", "Galway Arts Festival"],
        answer: 1
    },
    {
        question: "Which famous rock band originated from Dublin in 1976?",
        options: ["The Cranberries", "U2", "Thin Lizzy", "The Corrs"],
        answer: 1
    },
    {
        question: "What is the Irish name for Ireland?",
        options: ["Éire", "Alba", "Cymru", "Ellan Vannin"],
        answer: 0
    },
    {
        question: "Which Irish whiskey brand is one of the oldest distilleries in Ireland?",
        options: ["Jameson", "Bushmills", "Tullamore Dew", "Redbreast"],
        answer: 1
    },
    {
        question: "What is the name of the traditional Irish dance form known for its rapid leg and foot movements?",
        options: ["Ceilidh", "Flamenco", "Ballet", "Irish Stepdance"],
        answer: 3
    }
];

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
        options[selectedOption].style.backgroundColor = "#dc3545";
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
    document.getElementById('score').textContent = score;
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