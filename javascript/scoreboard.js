const boggleHighScoresList = document.getElementById('boggleHighScoresList');
const boggleHighScores = JSON.parse(localStorage.getItem('boggleHighScores')) || [];

boggleHighScoresList.innerHTML = 
boggleHighScores.map(score => {
    return `<tr class="high-score">
                <td class="individual-score">${score.name}</td>
                <td class="individual-score">${score.wordsFound}</td>
                <td class="individual-score">${score.score}</td>
            </tr>`
}).join("");