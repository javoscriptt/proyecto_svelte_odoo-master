<!-- src/components/Fabricacion.svelte -->
<script>
    import { selectedApps } from '../stores.js';
    import AppCard from './AppCard.svelte';
  
    let items = [
  { label: "Fabricación", icon: "/icons/fabricacion.png" },
  { label: "Gestión del ciclo del producto", icon: "/icons/ciclo_producto.png" },
  { label: "Mantenimiento", icon: "/icons/mantenimiento.png" },
  { label: "Calidad", icon: "/icons/calidad.png" },
  { label: "Reparación", icon: "/icons/reparacion.png" },
];

  
    function toggleItem(item) {
      selectedApps.update((current) => {
        const index = current.findIndex((app) => app.label === item.label);
        if (index === -1) {
          return [...current, item];
        } else {
          return current.filter((_, i) => i !== index);
        }
      });
    }
  </script>
  
  <div class="category">
    <h2 class="category-title">Fabricación</h2>
    <div class="category-items">
      {#each items as item}
        <AppCard
          {item}
          onToggle={() => toggleItem(item)}
        />
      {/each}
    </div>
  </div>
  
  <style>
    .category {
      margin-bottom: 1.5rem;
    }
    .category-title {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    .category-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 0.5rem;
    }
  </style>
  