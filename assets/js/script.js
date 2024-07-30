//Add Questions Array
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    }
];
//  Initialize Variables
let currentQuestion = 0;
let score = 0;

// : Load Question Function
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');
    
    questionElement.textContent = questions[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
        option.style.backgroundColor = "#007bff";
    });
    
    document.getElementById('next').style.display = 'none';
}
