import lodash from 'lodash';
import { writable } from 'svelte/store';
import type { Tuple } from '../types/tuple';

const { times } = lodash;

type Board = Tuple<number, 16>;

export const board = writable(times(16, () => 0) as Board);
