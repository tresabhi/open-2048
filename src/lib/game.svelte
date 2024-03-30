<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { Direction, board } from '../stores/board';

  const COLOR_MAP = [4, 5, 6, 6, 6, 6, 7, 7, 8, 9];

  onMount(() => {
    if (get(board).cells.every((cell) => cell === 0)) board.insertRandomCell();
  });

  function onKeyDown({ key, repeat }: KeyboardEvent) {
    if (repeat) return;

    switch (key) {
      case 'w':
      case 'ArrowUp':
        board.move(Direction.Up);
        break;

      case 'a':
      case 'ArrowLeft':
        board.move(Direction.Left);
        break;

      case 's':
      case 'ArrowDown':
        board.move(Direction.Down);
        break;

      case 'd':
      case 'ArrowRight':
        board.move(Direction.Right);
        break;

      case 'r':
        board.clear();
        board.insertRandomCell();
        break;
    }
  }
</script>

<div class="container">
  {#each Array(16) as _, index}
    <div
      class="cell"
      style={`background-color: ${
        $board.cells[index] === 0
          ? 'none'
          : `var(--amber-${COLOR_MAP[Math.log2($board.cells[index]) - 1] ?? COLOR_MAP.at(-1)})`
      }`}
    >
      {$board.cells[index] === 0 ? '' : $board.cells[index]}
    </div>
  {/each}
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(4, auto);
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--mauve-2);
    border-radius: 0.5rem;
  }

  .cell {
    border-radius: 0.5rem;
    width: 6rem;
    height: 6rem;
    background-color: var(--mauve-1);
    color: var(--mauve-12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
</style>
