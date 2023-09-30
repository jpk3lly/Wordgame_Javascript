const boggleHighScoresList = document.getElementById('boggleHighScoresList');
const boggleHighScores = JSON.parse(localStorage.getItem('boggleHighScores')) || [];

boggleHighScoresList.innerHTML = 
boggleHighScores.map(score => {
    return `<tr>
                <td class="high-score">${score.name}</td>
                <td class="high-score">${score.wordsFound}</td>
                <td class="high-score">${score.score}</td>
            </tr>`
}).join("");