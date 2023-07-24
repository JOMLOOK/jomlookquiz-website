const startButton = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const doneButton = document.getElementById('done-btn');


// 新增获取输入框元素
const staffCodeInput = document.getElementById('staff-code');
const nameInput = document.getElementById('name');
const branchInput = document.getElementById('branch');

let shuffledQuestions = [];
const NUM_QUESTIONS_PER_TASK = 5;
let currentQuestionIndex;
let currentQuestionNumber;
let score = 0;

startButton.addEventListener("click", startGame);
doneButton.addEventListener("click", showStaffCodePage);

function startGame() {
    console.log('Started');
    if (!isFormValid()) {
        alert('Please fill in all the required information (Staff Code, Name, and Branch) before starting the quiz.');
        return;
    }
    
    startButton.classList.add('hide');
    shuffleArray(questions);
    shuffledQuestions = questions.slice(0, NUM_QUESTIONS_PER_TASK);
    currentQuestionIndex = 0;
    currentQuestionNumber = 1;
    score = 0;
    questionContainerElement.classList.remove('hide');
    scoreElement.innerText = '';
    setNextQuestion();

    // 隐藏输入框和标题
    document.querySelectorAll('.hidden-input').forEach(input => {
        input.style.display = 'none';
    });
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionNumber);
}

function showQuestion(question, questionNumber) {
    questionElement.innerText = `${questionNumber}. ${question.question}`;
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(index));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selectedIndex) {
    const correctIndex = shuffledQuestions[currentQuestionIndex].answers.findIndex(answer => answer.correct);
    const correct = selectedIndex === correctIndex;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button, index) => {
        setStatusClass(button, index === correctIndex);
    });
    if (correct) {
        score++;
    }
    currentQuestionIndex++;
    currentQuestionNumber++;
    if (shuffledQuestions.length > currentQuestionIndex) {
        setNextQuestion();
    } else {
        showScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showScore() {
    questionContainerElement.classList.add('hide');
    submitButton.classList.add('hide');
    scoreElement.innerText = `You scored ${score} out of ${NUM_QUESTIONS_PER_TASK}.`;
    
    // 显示得分部分，隐藏问题部分
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.classList.remove('hide');

    // 隐藏输入框
    document.querySelectorAll('.hidden-input').forEach(input => {
        input.style.display = 'none';
    });

    // 切换按钮文本
    startButton.innerText = 'DONE';
    startButton.classList.remove('hide');
    doneButton.classList.remove('hide');
}

function showStaffCodeCover() {
    // 隐藏问题和得分部分
    questionContainerElement.classList.add('hide');
    submitButton.classList.add('hide');
    scoreElement.innerText = '';

    // 显示输入框和"Start"按钮
    document.querySelectorAll('.hidden-input').forEach(input => {
        input.style.display = 'block';
    });

    // 切换按钮文本
    startButton.innerText = 'Start';
    startButton.classList.remove('hide');
    doneButton.classList.add('hide');
}

function showStaffCodePage() {
    // 显示问题和得分部分，隐藏输入框和得分部分
    questionContainerElement.classList.add('hide');
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.classList.add('hide');

    document.querySelectorAll('.hidden-input').forEach(input => {
        input.style.display = 'block';
    });
    
    score = 0; // Reset the score for a new quiz

    // 切换按钮文本
    startButton.innerText = 'Start';
    startButton.classList.remove('hide');
    doneButton.classList.add('hide');
}

startButton.addEventListener("click", () => {
    if (startButton.innerText === 'Start') {
        if (isFormValid()) {
            startGame();
        } else {
            alert('Please fill in all the required information (Staff Code, Name, and Branch) before starting the quiz.');
        }
    } else if (startButton.innerText === 'DONE') {
        showStaffCodeCover();
    }
});

function isFormValid() {
    return staffCodeInput.value.trim() !== '' && nameInput.value.trim() !== '' && branchInput.value.trim() !== '';
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'What is 4 * 3?',
        answers: [
            { text: '12', correct: true },
            { text: '16', correct: false }
        ]
    },
    {
        question: 'What is 5 * 5?',
        answers: [
            { text: '25', correct: true },
            { text: '30', correct: false }
        ]
    },
    {
        question: 'What is 10 * 2?',
        answers: [
            { text: '200', correct: false },
            { text: '20', correct: true }
        ]
    },
    {
    question: 'What is 7 + 5?',
    answers: [
        { text: '13', correct: false },
        { text: '12', correct: true }
    ]
    },
    {
        question: 'What is 10 / 5?',
        answers: [
            { text: '50', correct: false },
            { text: '2', correct: true },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'What is 11 * 5?',
        answers: [
            { text: '52', correct: false },
            { text: '55', correct: true }
        ]
    }
];