const board = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = idx;
    cell.innerText = val;
    board.appendChild(cell);
  });
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      gameActive = false;
      statusText.innerText = `Player ${cells[a]} wins!`;
      return;
    }
  }
  if (!cells.includes("")) {
    gameActive = false;
    statusText.innerText = "It's a draw!";
  }
}

board.addEventListener("click", e => {
  if (!gameActive) return;

  const index = e.target.dataset.index;
  if (!index || cells[index] !== "") return;

  cells[index] = currentPlayer;
  createBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
  }
});

resetBtn.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard();
