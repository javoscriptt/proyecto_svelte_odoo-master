<!-- src/components/RecursosHumanos.svelte -->
<script>
    import { selectedApps } from '../stores.js';
    import AppCard from './AppCard.svelte';
  
    let items = [
  { label: "Empleados", icon: "/icons/empleados.png" },
  { label: "Asistencias", icon: "/icons/asistencias.png" },
  { label: "Reclutamiento", icon: "/icons/reclutamiento.png" },
  { label: "Referencias", icon: "/icons/referencias.png" },
  { label: "Flota", icon: "/icons/flota.png" },
  { label: "Gastos", icon: "/icons/gastos.png" },
  { label: "Planificación", icon: "/icons/planificacion.png" },
  { label: "Evaluación", icon: "/icons/evaluacion.png" },
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
    <h2 class="category-title">Recursos Humanos</h2>
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
  