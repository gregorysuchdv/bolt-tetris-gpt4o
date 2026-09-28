import { describe, it, expect } from 'vitest';
import { createGrid, clearLines } from '../src/grid.js';

const ROWS = 20;
const COLS = 10;

const fullRow = () => Array(COLS).fill(1);
const isEmptyRow = (row) => row.every((c) => c === 0);

describe('createGrid', () => {
  it('crée une grille vide de la bonne taille', () => {
    const grid = createGrid(ROWS, COLS);
    expect(grid).toHaveLength(ROWS);
    grid.forEach((row) => {
      expect(row).toHaveLength(COLS);
      expect(isEmptyRow(row)).toBe(true);
    });
  });

  it('crée des lignes indépendantes', () => {
    const grid = createGrid(ROWS, COLS);
    grid[0][0] = 1;
    expect(grid[1][0]).toBe(0);
  });
});

describe('clearLines', () => {
  it('efface une ligne pleine et fait descendre le reste', () => {
    const grid = createGrid(ROWS, COLS);
    grid[18][0] = 1;
    grid[19] = fullRow();
    clearLines(grid);
    expect(grid).toHaveLength(ROWS);
    expect(grid[19]).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    for (let y = 0; y < 19; y++) expect(isEmptyRow(grid[y])).toBe(true);
  });

  it('efface deux lignes pleines consécutives', () => {
    const grid = createGrid(ROWS, COLS);
    grid[17][0] = 1;
    grid[18] = fullRow();
    grid[19] = fullRow();
    clearLines(grid);
    expect(grid).toHaveLength(ROWS);
    expect(grid[19]).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    for (let y = 0; y < 19; y++) expect(isEmptyRow(grid[y])).toBe(true);
  });

  it('efface quatre lignes pleines consécutives (Tetris)', () => {
    const grid = createGrid(ROWS, COLS);
    grid[15][2] = 1;
    for (let y = 16; y < 20; y++) grid[y] = fullRow();
    clearLines(grid);
    expect(grid).toHaveLength(ROWS);
    expect(grid[19]).toEqual([0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
    for (let y = 0; y < 19; y++) expect(isEmptyRow(grid[y])).toBe(true);
  });

  it('efface deux lignes pleines non consécutives', () => {
    const grid = createGrid(ROWS, COLS);
    grid[16][2] = 1;
    grid[17] = fullRow();
    grid[18][1] = 1;
    grid[19] = fullRow();
    clearLines(grid);
    expect(grid).toHaveLength(ROWS);
    expect(grid[19]).toEqual([0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(grid[18]).toEqual([0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
    for (let y = 0; y < 18; y++) expect(isEmptyRow(grid[y])).toBe(true);
  });

  it('ne change rien sans ligne pleine', () => {
    const grid = createGrid(ROWS, COLS);
    grid[19][0] = 1;
    grid[18][5] = 1;
    const before = grid.map((row) => [...row]);
    clearLines(grid);
    expect(grid).toEqual(before);
  });
});
