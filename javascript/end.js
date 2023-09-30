const currentScore = document.getElementById('final-score');
const wordsFound = document.getElementById('words-found');
const playAgainBtn = document.getElementById('play-again-btn');
const scoreboardBtn = document.getElementById('scoreboard-btn');
const boggleHighScores = JSON.parse(localStorage.getItem("boggleHighScores")) || [];
const mostRecentScore = localStorage.getItem('mostRecentScore');
const wordsIdentified = localStorage.getItem('words');
const totalWordsIdentified = localStorage.getItem('wordCount');

currentScore.innerText = mostRecentScore;
wordsFound.innerText = `You found ${totalWordsIdentified} words in total`;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
    score: mostRecentScore,
    wordsFound: totalWordsIdentified,
    name: username.value
    };

boggleHighScores.push(score);

boggleHighScores.sort((a,b) => {
    return b.score - a.score;
});

boggleHighScores.splice(10);

localStorage.setItem('boggleHighScores', JSON.stringify(boggleHighScores));
window.location.assign('/');
};

playAgain = () => {
    playAgainBtn.addEventListener("click", e => { 
        window.location.assign('game.html');
    });
}

scoreBoard = () => {
    scoreboardBtn.addEventListener("click", e => { 
        window.location.assign('scoreboard.html');
    });
}

playAgain();
scoreBoard();