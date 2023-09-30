const newGameBtn = document.getElementById('new-game');
const scoreboardBtn = document.getElementById('scoreboard');
const homeButton = document.getElementById('home');

newGame = () => {
    newGameBtn.addEventListener("click", e => {
        console.log(e); 
        window.location.assign('game.html');
    });
}

scoreBoard = () => {
    scoreboardBtn.addEventListener("click", e => { 
        window.location.assign('scoreboard.html');
    });
}

goHome = () => {
    homeButton.addEventListener("click", e => {
        console.log(e);
        window.location.assign('index.html');
    });
}

newGame();
scoreBoard();
goHome();