import { produce } from 'immer';
import lodash from 'lodash';
import { writable } from 'svelte/store';
import type { Tuple } from '../types/tuple';

const { times, forEach, forEachRight } = lodash;

type Cells = Tuple<number, 16>;
interface Board {
  hasBegun: boolean;
  cells: Cells;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const { subscribe, update } = writable<Board>({
  hasBegun: false,
  cells: times(16, (index) => 0) as Cells,
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

  move(direction: Direction) {
    let mutated = false;

    update(
      produce<Board>((draft) => {
        times(4, (component1) => {
          const even = direction % 2 === 0;
          const vertical = direction <= 1;
          const slice = vertical
            ? draft.cells.filter((_, index) => index % 4 === component1)
            : draft.cells.slice(4 * component1, 4 * component1 + 4);

          (even ? forEach : forEachRight)(slice, (cell, component2) => {
            if (cell === 0 || component2 === (even ? 0 : 3)) return;

            const mergeableIndex = slice[even ? 'findIndex' : 'findLastIndex'](
              (searchingCell) => searchingCell === cell,
            );

            if (
              (even
                ? mergeableIndex < component2
                : mergeableIndex > component2) &&
              slice
                .slice(
                  (even ? mergeableIndex : component2) + 1,
                  even ? component2 : mergeableIndex,
                )
                .every((cell) => cell === 0)
            ) {
              slice[mergeableIndex] = cell << 1;
              slice[component2] = 0;
              mutated = true;
            } else {
              const emptyIndex = slice[even ? 'findIndex' : 'findLastIndex'](
                (searchingCell) => searchingCell === 0,
              );

              if (
                (even ? emptyIndex < component2 : emptyIndex > component2) &&
                slice
                  .slice(
                    (even ? emptyIndex : component2) + 1,
                    even ? component2 : emptyIndex,
                  )
                  .every((cell) => cell === 0)
              ) {
                slice[emptyIndex] = cell;
                slice[component2] = 0;
                mutated = true;
              }
            }
          });

          slice.forEach(
            (cell, component2) =>
              (draft.cells[
                (vertical ? component1 : component2) +
                  4 * (vertical ? component2 : component1)
              ] = cell),
          );
        });
      }),
    );

    if (mutated) this.insertRandomCell();
  },
};
