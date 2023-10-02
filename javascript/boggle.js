const newGameBtn = document.getElementById('new-game');
const scoreboardBtn = document.getElementById('scoreboard');
const homeButton = document.getElementById('home');
const textAnimation = document.getElementById("typing-animation")

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

startTextAnimation = () => {
         // JavaScript for the text animation
         const text = textAnimation.textContent;
         textAnimation.textContent = ""; // Clear the original text
         let index = 0;
         const speed = 100; // Typing speed in milliseconds

         console.log(" Hello ")
 
         function type() {
             if (index < text.length) {
                textAnimation.textContent += text.charAt(index);
                 index++;
                 setTimeout(type, speed);
             }
         }
 
         // Start the typing animation when the page loads
         window.onload = function() {
             type();
         };
}

startTextAnimation();
newGame();
scoreBoard();
goHome();
