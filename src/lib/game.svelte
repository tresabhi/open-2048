<script lang="ts">
  import { board } from '../stores/board';
</script>

<div class="container">
  {#each Array(16) as _, index}
    <div class="cell">{$board[index]}</div>
  {/each}
</div>

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
