<script lang="ts">
  import Game from '$lib/game.svelte';
  import { onMount } from 'svelte';

  let extraClass = '';

  onMount(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      extraClass = 'dark';
    }
  });
</script>

<div class={`container ${extraClass}`}>
  <Game />
</div>

<style>
  @import '@radix-ui/colors/mauve.css';
  @import '@radix-ui/colors/mauve-dark.css';

  .container {
    background-color: var(--mauve-1);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
