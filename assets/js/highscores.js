const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const clear = document.getElementById('clear')

const MAX_HIGH_Scores = 5;


finalScore = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;

});

saveHighScore = e =>{
    e.preventDefault();

    const score = {
        score: finalScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    }) 
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('highscores.html');
    console.log(highScores);
}

highScoresList.innerHTML = highScores.map(score => {
    return `<li class='high-score'>${score.name}-${score.score}</li>`;
}).join("")

function clearscore (){
    
    localStorage.removeItem('highScores');
    localStorage.removeItem('mostRecentScore');
    window.location.assign('highscores.html')
}

clear.addEventListener('click', clearscore)