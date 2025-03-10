<!-- src/components/SitioWeb.svelte -->
<script>
    import { selectedApps } from '../stores.js';
    import AppCard from './AppCard.svelte';
  
    let items = [
  { label: "Sitio web", icon: "/icons/sitio_web.png" },
  { label: "Comercio electrónico", icon: "/icons/ecommerce.png" },
  { label: "eLearning", icon: "/icons/elearning.png" },
  { label: "Chat en vivo", icon: "/icons/chat_en_vivo.png" },
];

  
    function toggleItem(item) {
      selectedApps.update((current) => {
        // ¿Está ya en la lista?
        const index = current.findIndex((app) => app.label === item.label);
        if (index === -1) {
          // No está, lo agregamos
          return [...current, item];
        } else {
          // Ya está, lo quitamos
          return current.filter((_, i) => i !== index);
        }
      });
    }
  </script>
  
  <div class="category">
    <h2 class="category-title">Sitio Web</h2>
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
  