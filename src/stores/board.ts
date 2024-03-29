import { produce } from 'immer';
import lodash from 'lodash';
import { writable } from 'svelte/store';
import type { Tuple } from '../types/tuple';

const { times } = lodash;

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
      produce<Board>((board) => {
        const availableCells: number[] = [];

        board.cells.forEach((cell, index) => {
          if (cell === 0) availableCells.push(index);
        });

        if (availableCells.length === 0) {
          hasInserted = false;
          return;
        }

        const randomCell =
          availableCells[Math.floor(Math.random() * availableCells.length)];
        board.cells[randomCell] = Math.random() < 0.9 ? 2 : 4;
      }),
    );

    return hasInserted;
  },
};
