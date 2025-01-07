import './style.css';
    import { createGrid, drawGrid } from './grid.js';
    import { createPiece, movePiece, rotatePiece, dropPiece, isValidMove } from './gameLogic.js';

    const gameElement = document.getElementById('game');
    const gridElement = gameElement.querySelector('.grid');

    const grid = createGrid(20, 10);
    let currentPiece = createPiece('I');

    function gameLoop() {
      if (dropPiece(grid, currentPiece)) {
        currentPiece = createPiece('I');
        if (!isValidMove(grid, currentPiece, 0, 0)) {
          alert('Game Over');
          grid.forEach(row => row.fill(0));
        }
      }
      drawGrid(grid, gridElement);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') movePiece(grid, currentPiece, -1, 0);
      if (e.key === 'ArrowRight') movePiece(grid, currentPiece, 1, 0);
      if (e.key === 'ArrowDown') dropPiece(grid, currentPiece);
      if (e.key === 'ArrowUp') rotatePiece(grid, currentPiece);
      drawGrid(grid, gridElement);
    });

    setInterval(gameLoop, 1000);
