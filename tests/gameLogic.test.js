import { describe, it, expect, beforeEach } from 'vitest';
import { createGrid } from '../src/grid.js';
import {
  createPiece,
  drawPiece,
  isValidMove,
  movePiece,
  rotatePiece,
  dropPiece
} from '../src/gameLogic.js';

const ROWS = 20;
const COLS = 10;

const countFilled = (grid) =>
  grid.reduce((sum, row) => sum + row.filter((c) => c !== 0).length, 0);

// Fait tomber la pièce jusqu'à l'atterrissage ; renvoie le nombre d'appels.
const dropUntilLanded = (grid, piece, max = 100) => {
  for (let i = 1; i <= max; i++) {
    if (dropPiece(grid, piece)) return i;
  }
  throw new Error('La pièce n\'a jamais atterri');
};

describe('gameLogic', () => {
  let grid;
  let piece;

  beforeEach(() => {
    grid = createGrid(ROWS, COLS);
    piece = createPiece('I'); // horizontale, x = 3, y = 0
    drawPiece(grid, piece);
  });

  describe('movePiece', () => {
    it('déplace la pièce vers la gauche (non-régression PR #1)', () => {
      expect(movePiece(grid, piece, -1, 0)).toBe(true);
      expect(piece.position.x).toBe(2);
      expect(grid[0].slice(2, 6)).toEqual([1, 1, 1, 1]);
      expect(grid[0][6]).toBe(0);
      expect(countFilled(grid)).toBe(4);
    });

    it('déplace la pièce vers la droite', () => {
      expect(movePiece(grid, piece, 1, 0)).toBe(true);
      expect(piece.position.x).toBe(4);
      expect(grid[0][3]).toBe(0);
      expect(grid[0].slice(4, 8)).toEqual([1, 1, 1, 1]);
      expect(countFilled(grid)).toBe(4);
    });

    it('refuse de sortir par le bord gauche', () => {
      movePiece(grid, piece, -3, 0); // x = 0
      expect(movePiece(grid, piece, -1, 0)).toBe(false);
      expect(piece.position.x).toBe(0);
      expect(grid[0].slice(0, 4)).toEqual([1, 1, 1, 1]);
      expect(countFilled(grid)).toBe(4);
    });

    it('refuse de sortir par le bord droit', () => {
      movePiece(grid, piece, 3, 0); // x = 6, cases 6 à 9
      expect(movePiece(grid, piece, 1, 0)).toBe(false);
      expect(piece.position.x).toBe(6);
      expect(grid[0].slice(6, 10)).toEqual([1, 1, 1, 1]);
      expect(countFilled(grid)).toBe(4);
    });

    it('refuse d\'entrer dans un bloc déjà posé', () => {
      grid[0][2] = 1;
      expect(movePiece(grid, piece, -1, 0)).toBe(false);
      expect(piece.position.x).toBe(3);
      expect(grid[0][2]).toBe(1);
      expect(countFilled(grid)).toBe(5);
    });
  });

  describe('isValidMove', () => {
    it('refuse une position au-dessus de la grille (newY < 0)', () => {
      const empty = createGrid(ROWS, COLS);
      expect(isValidMove(empty, piece, 0, -1)).toBe(false);
    });
  });

  describe('rotatePiece', () => {
    it('fait pivoter la pièce I (non-régression PR #1)', () => {
      rotatePiece(grid, piece);
      expect(piece.rotation).toBe(1);
      for (let y = 0; y < 4; y++) expect(grid[y][3]).toBe(1);
      expect(grid[0][4]).toBe(0);
      expect(countFilled(grid)).toBe(4);
    });

    it('refuse une rotation qui sortirait de la grille', () => {
      rotatePiece(grid, piece); // verticale en x = 3
      movePiece(grid, piece, 5, 0); // verticale en x = 8
      rotatePiece(grid, piece); // l'horizontale occuperait x = 8 à 11
      expect(piece.rotation).toBe(1);
      for (let y = 0; y < 4; y++) expect(grid[y][8]).toBe(1);
      expect(countFilled(grid)).toBe(4);
    });
  });

  describe('dropPiece', () => {
    it('fait descendre une pièce verticale (non-régression PR #1)', () => {
      rotatePiece(grid, piece);
      expect(dropPiece(grid, piece)).toBe(false);
      expect(piece.position.y).toBe(1);
      expect(grid[0][3]).toBe(0);
      for (let y = 1; y < 5; y++) expect(grid[y][3]).toBe(1);
    });

    it('fait tomber la pièce jusqu\'en bas puis signale l\'atterrissage', () => {
      const calls = dropUntilLanded(grid, piece);
      expect(calls).toBe(ROWS); // 19 descentes + 1 appel qui atterrit
      expect(piece.position.y).toBe(ROWS - 1);
      expect(grid[ROWS - 1].slice(3, 7)).toEqual([1, 1, 1, 1]);
      expect(countFilled(grid)).toBe(4);
    });

    it('atterrit sur un bloc posé sans l\'effacer', () => {
      grid[ROWS - 1][4] = 1;
      dropUntilLanded(grid, piece);
      expect(piece.position.y).toBe(ROWS - 2);
      expect(grid[ROWS - 1][4]).toBe(1);
      expect(grid[ROWS - 2].slice(3, 7)).toEqual([1, 1, 1, 1]);
      expect(countFilled(grid)).toBe(5);
    });

    it('efface la ligne complétée à l\'atterrissage', () => {
      for (let x = 0; x < COLS; x++) {
        if (x < 3 || x > 6) grid[ROWS - 1][x] = 1;
      }
      dropUntilLanded(grid, piece);
      expect(grid).toHaveLength(ROWS);
      expect(countFilled(grid)).toBe(0);
    });
  });
});
