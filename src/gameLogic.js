import { drawGrid, clearLines } from './grid.js';
    import { pieces } from './pieces.js';

    export const createPiece = (type) => {
      return {
        shape: pieces[type],
        rotation: 0,
        position: { x: 3, y: 0 }
      };
    };

    export const drawPiece = (grid, piece) => {
      const { shape, rotation, position } = piece;
      shape[rotation].forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            grid[position.y + y][position.x + x] = 1;
          }
        });
      });
    };

    export const undrawPiece = (grid, piece) => {
      const { shape, rotation, position } = piece;
      shape[rotation].forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            grid[position.y + y][position.x + x] = 0;
          }
        });
      });
    };

    export const isValidMove = (grid, piece, dx, dy, rotation) => {
      const { shape, position } = piece;
      const newRotation = rotation !== undefined ? rotation : piece.rotation;
      return shape[newRotation].every((row, y) => {
        return row.every((value, x) => {
          if (!value) return true;
          const newX = position.x + x + dx;
          const newY = position.y + y + dy;
          return (
            newX >= 0 &&
            newX < grid[0].length &&
            newY < grid.length &&
            grid[newY][newX] === 0
          );
        });
      });
    };

    export const movePiece = (grid, piece, dx, dy) => {
      if (isValidMove(grid, piece, dx, dy)) {
        undrawPiece(grid, piece);
        piece.position.x += dx;
        piece.position.y += dy;
        drawPiece(grid, piece);
      }
    };

    export const rotatePiece = (grid, piece) => {
      const newRotation = (piece.rotation + 1) % piece.shape.length;
      if (isValidMove(grid, piece, 0, 0, newRotation)) {
        undrawPiece(grid, piece);
        piece.rotation = newRotation;
        drawPiece(grid, piece);
      }
    };

    export const dropPiece = (grid, piece) => {
      if (isValidMove(grid, piece, 0, 1)) {
        movePiece(grid, piece, 0, 1);
      } else {
        drawPiece(grid, piece);
        clearLines(grid);
        return true; // Piece has landed
      }
      return false;
    };
