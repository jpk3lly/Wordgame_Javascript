import { db } from "./firebaseConfig.js"
import { ref, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// VARIABLES & FUNCTIONS

const currentScore = document.getElementById('final-score');
const wordsFound = document.getElementById('words-found');
const playAgainBtn = document.getElementById('play-again-btn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const answerArray = JSON.parse(localStorage.getItem('words'));
const totalWordsIdentified = localStorage.getItem('wordCount');
const acceptedAnswers = document.getElementById('accepted-answers');
const saveScoreBtn = document.getElementById("saveScoreBtn");
const username = document.getElementById("username");

currentScore.innerText = mostRecentScore;
wordsFound.innerText = `You found ${totalWordsIdentified} words in total`;


acceptedAnswers.innerHTML = answerArray.map(word => {
    return `<li class="answer-rundown">${word}</li>`
}).join("");

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


saveScoreBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const score = {
    score: Number(mostRecentScore),
    wordsFound: Number(totalWordsIdentified),
    name: username.value
    };

    await push(ref(db, "allScores"), score)
    .then(() => console.log("data pushed"))
    .catch(err => console.log(err));

    window.location.assign('../scoreboard.html');
}
)


function playAgain () {
    playAgainBtn.addEventListener("click", e => { 
        window.location.assign('game.html');
    });
}


playAgain();