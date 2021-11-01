const games = ["4Gewinnt", "Auralux", "LandingSim", "Pong", "Rechnen", "Snake", "Tetris", "TicTacToe"];

window.onload = function() {
    games.forEach(
        game => {
            let gameDiv = document.createElement("div");
            gameDiv.setAttribute("class", "game");

            let gameA = document.createElement("a");
            gameA.setAttribute("href", `./src/games/${game}/index.html`);

            let gameImg = document.createElement("img");
            gameImg.setAttribute("src", "");
            gameImg.setAttribute("alt", game);

            gameA.appendChild(gameImg);
            gameDiv.appendChild(gameA);

            document.getElementById("games").appendChild(gameDiv);
        }
    )
}