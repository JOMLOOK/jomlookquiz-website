const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

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
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    currentQuestionNumber++;
    setNextQuestion();
});

submitButton.addEventListener("click", showScore);

function startGame() {
    console.log('Started');
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
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        submitButton.classList.remove('hide');
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
}

startButton.addEventListener("click", () => {
    if (startButton.innerText === 'Start') {
        startGame();
    } else if (startButton.innerText === 'DONE') {
        showStaffCodeCover();
    }
});

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
}

function showStaffCodePage() {
    // 显示问题和得分部分，隐藏输入框和得分部分
    questionContainerElement.classList.remove('hide');
    document.querySelectorAll('.hidden-input').forEach(input => {
        input.style.display = 'none';
    });
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.classList.add('hide');
    submitButton.classList.remove('hide');

    // 切换按钮文本
    startButton.innerText = 'Start';
    startButton.classList.remove('hide');
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
            { text: '2', correct: true }
        ]
    },
    {
        question: 'What is 11 / 5?',
        answers: [
            { text: '52', correct: false },
            { text: '55', correct: true }
        ]
    }
];