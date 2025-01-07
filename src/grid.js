export const createGrid = (rows, cols) => {
      return Array.from({ length: rows }, () => Array(cols).fill(0));
    };

    export const drawGrid = (grid, gridElement) => {
      gridElement.innerHTML = '';
      grid.forEach(row => {
        row.forEach(cell => {
          const cellElement = document.createElement('div');
          cellElement.className = 'w-8 h-8 border border-cyberpunk-200';
          cellElement.style.backgroundColor = cell ? 'cyan' : 'transparent';
          gridElement.appendChild(cellElement);
        });
      });
    };

    export const clearLines = (grid) => {
      grid.forEach((row, y) => {
        if (row.every(cell => cell !== 0)) {
          grid.splice(y, 1);
          grid.unshift(Array(grid[0].length).fill(0));
        }
      });
    };
