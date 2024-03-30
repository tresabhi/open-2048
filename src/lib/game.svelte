<script lang="ts">
  import lodash from 'lodash';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { Direction, board } from '../stores/board';

  const { times } = lodash;

  const colorMap = times(8, (index) => index + (index > 6 ? 2 : 1));

  console.log(colorMap);

  onMount(() => {
    if (!get(board).hasBegun) board.insertRandomCell();
  });

  function onKeyDown({ key, repeat }: KeyboardEvent) {
    // if (repeat) return;

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
    }
  }
</script>

<div class="container">
  {#each Array(16) as _, index}
    <div
      class="cell"
      style={`background-color: var(--amber-${
        colorMap[
          Math.min(
            colorMap.length - 1,
            Math.floor(
              (colorMap.length / (Math.log2(2048) + 1)) *
                Math.log2($board.cells[index]),
            ),
          )
        ]
      })`}
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
