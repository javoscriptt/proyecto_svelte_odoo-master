<!-- src/components/Operaciones.svelte -->
<script>
    import { selectedApps } from '../stores.js';
    import AppCard from './AppCard.svelte';
  
    let items = [
  { label: "Contabilidad", icon: "/icons/contabilidad.png" },
  { label: "Información", icon: "/icons/informacion.png" },
  { label: "Proyecto", icon: "/icons/proyecto.png" },
  { label: "Partes de horas", icon: "/icons/partes_horas.png" },
  { label: "Servicio de asistencia", icon: "/icons/asistencia.png" },
  { label: "Inventario", icon: "/icons/inventario.png" },
  { label: "Compra", icon: "/icons/compra.png" },
  { label: "Documentos", icon: "/icons/documentos.png" },
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
    <h2 class="category-title">Operaciones</h2>
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
  