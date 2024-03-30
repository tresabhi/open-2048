import { produce } from 'immer';
import lodash from 'lodash';
import { writable } from 'svelte/store';
import type { Tuple } from '../types/tuple';

const { times, forEachRight } = lodash;

type Cells = Tuple<number, 16>;
interface Board {
  hasBegun: boolean;
  cells: Cells;
}

const { subscribe, update } = writable<Board>({
  hasBegun: false,
  cells: times(16, () => 0) as Cells,
});

export const board = {
  subscribe,

  insertRandomCell() {
    let hasInserted = true;

    update(
      produce<Board>((draft) => {
        const availableCells: number[] = [];

        draft.cells.forEach((cell, index) => {
          if (cell === 0) availableCells.push(index);
        });

        if (availableCells.length === 0) {
          hasInserted = false;
          return;
        }

        const randomCell =
          availableCells[Math.floor(Math.random() * availableCells.length)];
        draft.cells[randomCell] = Math.random() < 0.9 ? 2 : 4;
      }),
    );

    return hasInserted;
  },

  up() {
    let mutated = false;

    update(
      produce<Board>((draft) => {
        times(4, (x) => {
          const column = draft.cells.filter((_, index) => index % 4 === x);

          column.forEach((cell, y) => {
            if (cell === 0 || y === 0) return;

            const mergeableY = column.findIndex(
              (searchingCell) => searchingCell === cell,
            );
            if (
              mergeableY < y &&
              column.slice(mergeableY + 1, y).every((cell) => cell === 0)
            ) {
              column[mergeableY] = cell * 2;
              column[y] = 0;
              mutated = true;
            } else {
              const emptyY = column.findIndex(
                (searchingCell) => searchingCell === 0,
              );
              if (
                emptyY < y &&
                column.slice(emptyY + 1, y).every((cell) => cell === 0)
              ) {
                column[emptyY] = cell;
                column[y] = 0;
                mutated = true;
              }
            }
          });

          column.forEach((cell, y) => (draft.cells[x + 4 * y] = cell));
        });
      }),
    );

    if (mutated) this.insertRandomCell();
  },

  down() {
    let mutated = false;

    update(
      produce<Board>((draft) => {
        times(4, (x) => {
          const column = draft.cells.filter((_, index) => index % 4 === x);

          forEachRight(column, (cell, y) => {
            if (cell === 0 || y === 3) return;

            const mergeableY = column.findLastIndex(
              (searchingCell) => searchingCell === cell,
            );
            if (
              mergeableY > y &&
              column.slice(y + 1, mergeableY).every((cell) => cell === 0)
            ) {
              column[mergeableY] = cell * 2;
              column[y] = 0;
              mutated = true;
            } else {
              const emptyY = column.findLastIndex(
                (searchingCell) => searchingCell === 0,
              );
              if (
                emptyY > y &&
                column.slice(y + 1, mergeableY).every((cell) => cell === 0)
              ) {
                column[emptyY] = cell;
                column[y] = 0;
                mutated = true;
              }
            }
          });

          column.forEach((cell, y) => (draft.cells[x + 4 * y] = cell));
        });
      }),
    );

    if (mutated) this.insertRandomCell();
  },

  left() {
    let mutated = false;

    update(
      produce<Board>((draft) => {
        console.clear();

        times(4, (y) => {
          const row = draft.cells.slice(4 * y, 4 * y + 4);

          console.log(row);

          row.forEach((cell, x) => {
            if (cell === 0 || x === 0) return;

            const mergeableX = row.findIndex(
              (searchingCell) => searchingCell === cell,
            );
            console.log(`(${x}, ${y})`, mergeableX);
            if (
              mergeableX < x &&
              row.slice(mergeableX + 1, x).every((cell) => cell === 0)
            ) {
              row[mergeableX] = cell * 2;
              row[x] = 0;
              mutated = true;
            } else {
              const emptyX = row.findIndex(
                (searchingCell) => searchingCell === 0,
              );
              if (
                emptyX < x &&
                row.slice(mergeableX + 1, x).every((cell) => cell === 0)
              ) {
                row[emptyX] = cell;
                row[x] = 0;
                mutated = true;
              }
            }
          });

          row.forEach((cell, x) => (draft.cells[x + 4 * y] = cell));
        });
      }),
    );

    if (mutated) this.insertRandomCell();
  },

  right() {
    let mutated = false;

    update(
      produce<Board>((draft) => {
        times(4, (y) => {
          const row = draft.cells.slice(4 * y, 4 * y + 4);

          forEachRight(row, (cell, x) => {
            if (cell === 0 || x === 3) return;

            const mergeableX = row.findLastIndex(
              (searchingCell) => searchingCell === cell,
            );
            if (
              mergeableX > x &&
              row.slice(x + 1, mergeableX).every((cell) => cell === 0)
            ) {
              row[mergeableX] = cell * 2;
              row[x] = 0;
              mutated = true;
            } else {
              const emptyX = row.findLastIndex(
                (searchingCell) => searchingCell === 0,
              );
              if (
                emptyX > x &&
                row.slice(x + 1, mergeableX).every((cell) => cell === 0)
              ) {
                row[emptyX] = cell;
                row[x] = 0;
                mutated = true;
              }
            }
          });

          row.forEach((cell, x) => (draft.cells[x + 4 * y] = cell));
        });
      }),
    );

    if (mutated) this.insertRandomCell();
  },
};
