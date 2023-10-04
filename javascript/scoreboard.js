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

// update the top 10 scores list in the HTML
function updateTopTenScores() {
    const topTenScoresList = document.getElementById('topTenScoresList');
    const boggleHighScores = JSON.parse(localStorage.getItem('boggleHighScores')) || [];

    topTenScoresList.innerHTML = ''; // Clear the existing list

    for (let i = 0; i < Math.min(boggleHighScores.length, 10); i++) {
        const score = boggleHighScores[i];
        const listItem = document.createElement('li');
        listItem.textContent = `${score.name} - Words Found: ${score.wordsFound}, Score: ${score.score}`;
        topTenScoresList.appendChild(listItem);
    }
}

updateTopTenScores();



