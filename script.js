document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const turnDisplay = document.getElementById('turn');
    const restartButton = document.getElementById('restart');
    const resultAlert = document.getElementById('result');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      if (gameBoard.every(cell => cell !== '')) {
        return 'draw';
      }
  
      return null;
    }
  
    function handleCellClick(index) {
      if (!gameActive || gameBoard[index] !== '') return;
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        if (winner === 'draw') {
          resultAlert.textContent = "It's a draw!";
        } else {
          resultAlert.textContent = `Player ${winner} wins!`;
        }
        resultAlert.classList.remove('hidden');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  
    cells.forEach(cell => {
      cell.addEventListener('click', function() {
        const index = parseInt(cell.getAttribute('data-index'));
        handleCellClick(index);
      });
    });
  
    restartButton.addEventListener('click', function() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      gameActive = true;
      turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
      resultAlert.classList.add('hidden');
    });
  });
  