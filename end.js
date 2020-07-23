const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');

const MAX_HIGH = 5;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', ()=>{
   saveScoreButton.disabled = !username.value;
});
saveHighScore = e =>{
    e.preventDefault();
    score = {
        score: mostRecentScore,
        name : username.value
    }
    
    highScores.push(score);
    

    highScores.sort((a, b)=> b.score-a.score);
    highScores.splice(5);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));

    return window.location.assign("index.html");
    
};