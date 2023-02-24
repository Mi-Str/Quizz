const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const feedback = document.getElementById('feedback');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const timeText = document.getElementById('time');
const progressBarFull = document.getElementById('progressBarFull')
const bonus = 10;
var time= 60;
timeText.innerText = time;

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {        
        question: 'What does HTML stands for?',
        choice1: 'Hypertext Markup Language',
        choice2: 'Hidden Markup Language',
        choice3: 'Hypertext Master Language',
        choice4: 'dont know',
        answer: 1
    },
    {
        question: 'What does PHP stands for?',
        choice1: 'Hypertext Placeholder',
        choice2: 'Public House Plaza',
        choice3:'Hypertext Preprocessor',
        choice4:'dont know',
        answer: 3
    },
    {
        question: 'What does CSS stands for?',
        choice1: 'Customer Service Support',
        choice2: 'College Scholarship Service',
        choice3:'Cascading Style Sheets',
        choice4:'dont know',
        answer: 3
    },
    {
        question: 'What does JS stands for?',
        choice1: 'Jack Sparrow',
        choice2: 'Java Standard',
        choice3:'Jelly Snake',
        choice4:'Javascript',
        answer: 4
    }
];

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    var timer = setInterval(function () {
        if (time > 0) {
          time--;
        }
    
        timeText.innerText = time;
    
        if (time < 1) {
          clearInterval(timer);          
        }
      }, 1000);

};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= 4){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign('highscores.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${questions.length}`
    progressBarFull.style.width = `${(questionCounter/ questions.length)*100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; 

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        console.log(choice)
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};
choices.forEach( choice => {
    choice.addEventListener('click' , e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    var check = ''
    if(selectedAnswer == currentQuestion.answer){
        check= 'Correct';
    }else{
        check = "Wrong";
    }

    if (check === 'Correct'){
        incrementScore(bonus)
    }

    if (check === "Wrong"){
        if (time < 10) {
            time = 0;
          } else {
            time += -10;
          }
    }
  
    feedback.innerText = `${check}`;

    setTimeout( () => {
        selectedChoice.parentElement.classList.remove(check);
        getNewQuestion();
    }, 1000);
   
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startGame();