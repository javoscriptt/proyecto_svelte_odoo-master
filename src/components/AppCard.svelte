<!-- src/components/AppCard.svelte -->
<script>
    export let item;     // { label: '...', icon: '...' }
    export let onToggle; // Función que se ejecuta al marcar/desmarcar
</script>

<div class="app-card" on:click={onToggle} tabindex="0" on:keydown={(e) => e.key === 'Enter' && onToggle()}>
    {#if item.icon}
      <img src={item.icon} alt={item.label} class="app-icon" />
    {/if}
    <span class="app-label">{item.label}</span>
    <input type="checkbox" />
</div> 

<style>
    .app-card {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #fff;
      border: 1px solid #eee;
      border-radius: 6px;
      padding: 0.5rem;
      cursor: pointer;
    }
    .app-card:hover {
      background-color: #f0f0f0;
    }
    .app-icon {
      width: 24px;
      height: 24px;
    }
    .app-label {
      flex: 1;
    }
    input[type="checkbox"] {
      cursor: pointer;
    }
</style>
