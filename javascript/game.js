/* CONSTANTS & VARIABLES */

const letterBlocks = Array.from(document.getElementsByClassName('answer-btn'));
const answerWindow = document.getElementById('answer');
const acceptedAnswers = document.getElementById('accepted-answers');
const submitButton = document.getElementById('submit-btn');
const clearButton = document.getElementById('clear-btn');
const quitButton = document.getElementById('quit-btn');
const timer = document.getElementById('timer');
const score = document.getElementById('score-view');
const answerDefinition = document.getElementById('answers');
const quitModal = document.getElementById("quit-modal")
const quitYes = document.getElementById("quit-yes")
const quitNo = document.getElementById("quit-no")
const onePoint = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'S', 'T', 'R'];
const twoPoints = ['D', 'G'];
const threePoints = ['B', 'C', 'M', 'P'];
const fourPoints = ['F', 'H', 'V', 'W', 'Y'];
const fivePoints = ['K'];
const eightPoints = ['J', 'X'];
const tenPoints = ['Q', 'Z'];


let selectedWord = '';
let submittedAnswers = [];
let timeRemaining = 180;
let wordDefinition = [];
let wordScore = 0;
let totalScore = 0;
let ansDefinition = [];



/* CREATING THE NEW GAME BOARD */

// function to generate a random letter
generateRandomLetters = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charLength = letters.length;
    let randomLetter = Math.floor(Math.random() * charLength);
    let result = letters.charAt(randomLetter);
    return result;
}

//loop that creates a new board of random letters
letterBlocks.forEach(letterBlock => {
    letterBlock.dataset['newLetter'];
    letterBlock.innerText = generateRandomLetters();
})

//set initial score on screen to 0
updateScore = () => {
    score.innerText = totalScore;
}


/* READING THE BUTTON PUSHES TO MAKE TO ANSWERS */

userAnswer = () => {
    letterBlocks.forEach((letterBlock, index) => {
        letterBlock.addEventListener("click", e => {
            let enabled = []; // enabled buttons while selecting letters

            if(letterBlock.classList.contains('disabled')){
                return;
            }
            if (letterBlock.classList.contains('answer-btn-selected')) {
                letterBlock.classList.add('selected-already')
                console.log(letterBlock.classList)
                setTimeout(() => {
                    letterBlock.classList.remove('selected-already');
                }, 500);
                return;
            }
            else {
                const selectedChoice = e.target;
                let selectedLetter = selectedChoice.innerText;
                selectedWord = selectedWord + selectedLetter;

                let row = Math.floor(index/4), col = index%4; // current row and col

                for(let k=-1; k<=1; ++k){
                    for(let l=-1; l<=1; ++l){
                        let enabledRow = row + k, enabledCol = col + l;
                        if(row == enabledRow && col == enabledCol)continue;
                        if(enabledRow < 0 || enabledCol < 0 || enabledRow >= 4 || enabledCol >= 4)continue;

                        let newInd = 4*enabledRow + enabledCol;
                        if(!enabled.includes(newInd)){
                            enabled.push(newInd);
                        }
                    }
                }

                // console.log(enabled);

                answerWindow.innerText = selectedWord;
                letterBlock.classList.remove('answer-btn')
                letterBlock.classList.add('answer-btn-selected')
            }

            letterBlocks.forEach((button, idx) => {
                if(!enabled.includes(idx)){
                    if(!button.classList.contains('disabled') && !button.classList.contains('answer-btn-selected')){
                        button.classList.add('disabled');
                        button.classList.remove('answer-btn');
                    }
                }
                else{
                    button.classList.remove('disabled');
                    if(!button.classList.contains('answer-btn'))button.classList.add('answer-btn');
                }
            })
        });
    });
}

userAnswer();

/* SETTING THE SUBMIT ACTION TO SAVE THE WORD AND THEN LET THE USER FIND ANOTHER WORD*/
submitAnswer = () => {

    submitButton.addEventListener("click", e => {
        letterBlocks.forEach(letterBlock => {
            letterBlock.classList.remove('answer-btn-selected')
            letterBlock.classList.add('answer-btn')
            letterBlock.classList.remove('disabled')
        });
        validateWord();
    });
}

submitAnswer();


/* SETTING THE CLEAR ACTION*/
resetButton = () => {
    clearButton.addEventListener("click", e => {
        console.log(e);
        clearAnswer();
    });
}

resetButton();


clearAnswer = () => {
    letterBlocks.forEach(letterBlock => {
        letterBlock.classList.remove('answer-btn-selected');
        letterBlock.classList.remove('disabled');
        letterBlock.classList.add('answer-btn');
        answerWindow.classList.remove('wrong-answer');
        answerWindow.classList.remove('right-answer');
        answerWindow.classList.remove('same-answer');
    });
    selectedWord = '';
    answerWindow.innerText = '';
    answerWindow.innerText = selectedWord;
    //answerDefinition.innerText = '';
}

/* USE DICTIONARY API TO VALIDATE ANSWERS*/


validateWord = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.title === 'No Definitions Found') {
                notAWord();
            }
            else if (selectedWord.length < 3) {
                notLongEnough();
            }
            else if (submittedAnswers.includes(selectedWord)) {
                alreadyUsedWord();
            }
            else {
                wordDefinition = `${data[0].word} - ${data[0].meanings[0].definitions[0].definition}`;
                ans = `${data[0].word} - ${data[0].meanings[0].definitions[0].definition}`;

                ansDefinition.push(ans);
                answerDefinition.innerHTML = ansDefinition.map(defi => {
                    return `<li class="definition">${defi}</li>`
                }).join("");

                answerDefinition.innerHTML = `${ans}`;


1000

                submittedAnswers.push(selectedWord);
                acceptedAnswers.innerHTML = submittedAnswers.map(answer => {
                    return `<li class="submitted-answers">${answer}</li>`
                }).join("");
                answerWindow.classList.add('right-answer')
                answerWindow.innerText = selectedWord;
                individualWordScore();
                setTimeout(() => {
                    clearAnswer();
                }, 200);
            };
        });
}

notAWord = () => {
    answerWindow.classList.add('wrong-answer')
    answerWindow.innerText = 'Not A Word!!';
    setTimeout(() => {
        clearAnswer();
    }, 200);
}

notLongEnough = () => {
    answerWindow.classList.add('wrong-answer')
    answerWindow.innerText = '3 Letters or More!!';
    setTimeout(() => {
        clearAnswer();
    }, 200);
}

alreadyUsedWord = () => {
    answerWindow.classList.add('same-answer')
    answerWindow.innerText = 'Had that one already!!';
    setTimeout(() => {
        clearAnswer();
    }, 200);
}

/* GAME TIMER */

countDown = () => {
    let countdownTimer = setInterval(function () {
        if (timeRemaining <= 0) {
            saveScores();
            clearInterval(timeRemaining);
            window.location.assign('end.html');
        }
        else {
            timer.innerText = timeRemaining;
        }
        timeRemaining--
    }, 1000);
};

countDown();

/* KEEPING SCORE */
individualWordScore = () => {
    for (var i = 0; i < selectedWord.length; i++) {
        if (twoPoints.includes(selectedWord.charAt(i))) {
            totalScore = totalScore + 2;
            updateScore();
        }
        else if (threePoints.includes(selectedWord.charAt(i))) {
            totalScore = totalScore + 3;
            updateScore();
        }
        else if (fourPoints.includes(selectedWord.charAt(i))) {
            totalScore = totalScore + 4;
            updateScore();
        }
        else if (fivePoints.includes(selectedWord.charAt(i))) {
            totalScore = totalScore + 5;
            updateScore();
        }
        else if (eightPoints.includes(selectedWord.charAt(i))) {
            totalScore = totalScore + 8;
            updateScore();
        }
        else if (tenPoints.includes(selectedWord.charAt(i))) {
            totalScore = totalScore + 10;
            updateScore();
        }
        else {
            totalScore = totalScore + 1;
            updateScore();
        }
    }
}

/* SAVING SCORE TO LOCAL STORAGE FOR SCOREBOARD */
saveScores = () => {
    localStorage.setItem('mostRecentScore', totalScore, 'wordCount', submittedAnswers.length);
    localStorage.setItem('words', submittedAnswers);
    localStorage.setItem('wordCount', submittedAnswers.length);
}

/* ACTION ON THE QUIT BUTTON */
const showModal=()=>{
    quitModal.style.display = 'block'
}
const handleQuitYes = ()=>{
    window.location.href = 'index.html'
}

const handleQuitNo = () =>{
    quitModal.style.display = 'none'; 
}
quitButton.addEventListener("click", showModal)
quitYes.addEventListener("click",handleQuitYes )
quitNo.addEventListener("click",handleQuitNo)


forfeitGameButton();
countDown();
submitAnswer();


