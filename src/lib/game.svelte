<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { board } from '../stores/board';

  onMount(() => {
    if (!get(board).hasBegun) board.insertRandomCell();
  });

  function onKeyDown({ key, repeat }: KeyboardEvent) {
    // if (repeat) return;

    switch (key) {
      case 'w':
      case 'ArrowUp':
        board.up();
        break;

      case 'a':
      case 'ArrowLeft':
        board.left();
        break;

      case 's':
      case 'ArrowDown':
        board.down();
        break;

      case 'd':
      case 'ArrowRight':
        board.right();
        break;
    }
  }
</script>

<div class="container">
  {#each Array(16) as _, index}
    <div
      class="cell"
      style={`background-color: var(--mauve-${Math.log2($board.cells[index]) + 2})`}
    >
      {$board.cells[index]}
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
