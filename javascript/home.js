const newGameBtn = document.getElementById('play-boggle');

playBoggle = () => {
    newGameBtn.addEventListener("click", e => {
        window.location.assign('game.html');
    });
}
playBoggle();
