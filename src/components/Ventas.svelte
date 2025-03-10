<!-- src/components/Ventas.svelte -->
<script>
    import { selectedApps } from '../stores.js';
    import AppCard from './AppCard.svelte';
  
    let items = [
  { label: "Ventas", icon: "/icons/ventas.png" },
  { label: "CRM", icon: "/icons/crm.png" },
  { label: "Punto de venta", icon: "/icons/punto_venta.png" },
  { label: "Restaurante", icon: "/icons/restaurante.png" },
  { label: "Facturación", icon: "/icons/facturacion.png" },
  { label: "Firma electrónica", icon: "/icons/firma_electronica.png" },
  { label: "Suscripciones", icon: "/icons/suscripciones.png" },
  { label: "Alquiler", icon: "/icons/alquiler.png" },
  { label: "Servicio de campo", icon: "/icons/servicio_campo.png" },

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
    <h2 class="category-title">Ventas</h2>
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
  