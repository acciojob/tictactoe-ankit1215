//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameOver = false;

const winningCombos = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

document.getElementById("submit").addEventListener("click", function(){
   player1 = document.getElementById("player1").value.trim();
player2 = document.getElementById("player2").value.trim();

    if(player1 === "" || player2 === ""){
        alert("Please enter both player names!");
        return;
    }

    currentPlayer = player1;

    // Switch UI
    document.getElementById("player-input").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.querySelector(".message").textContent = `${player1}, you're up`;
});


document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", function() {
        if (gameOver || cell.textContent !== "") return;

        // Place X or O
        cell.textContent = currentPlayer === player1 ? "X" : "O";

        // Check winner
        if (checkWinner()) {
            document.querySelector(".message").textContent = `${currentPlayer}, congratulations you won!`;
            gameOver = true;
            return;
        }

        // Switch turn
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
    });
});


function checkWinner() {
    let board = {};
    document.querySelectorAll(".cell").forEach(c => {
        board[c.id] = c.textContent;
    });

    // Check combos
    return winningCombos.some(combo => {
        let [a,b,c] = combo;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}
