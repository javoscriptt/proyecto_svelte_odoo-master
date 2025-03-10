<script>
  export let module;

  const handleMouseEnter = () => {
    // Animación al pasar el ratón
  };

  const handleMouseLeave = () => {
    // Animación al quitar el ratón
  };
</script>

<div class="module-icon" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
  <img src={module.icon} alt={module.name} />
  <p>{module.name}</p>
</div>

<style>
  .module-icon {
    /* ...existing code... */
    transition: transform 0.3s;
  }
  .module-icon:hover {
    transform: scale(1.1);
  }
  /* ...existing code... */
</style>
