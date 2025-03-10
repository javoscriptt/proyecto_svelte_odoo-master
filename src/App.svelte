<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Home from './Home.svelte';
  import Login from './routes/Login.svelte';
  import NavBar from './components/NavBar.svelte';
  import { user } from './stores/userStore';
  import { checkAuth } from './api/auth';
  import Graficos from './routes/graficos_screen.svelte';

  let currentView = 'selection';
  let authenticated = false;

  onMount(async () => {
    authenticated = await checkAuth();
  });

  // Lista de categorías con sus items (ícono y label)
  let categories = [
    {
      title: "SITIO WEB",
      items: [
        { label: "Sitio web", icon: "/icons/sitio_web.png" },
        { label: "Comercio electrónico", icon: "/icons/ecommerce.png" },
        { label: "eLearning", icon: "/icons/elearning.png" },
        { label: "Chat en vivo", icon: "/icons/chat_en_vivo.png" },
      ],
    },
    {
      title: "VENTAS",
      items: [
        { label: "Ventas", icon: "/icons/ventas.png" },
        { label: "CRM", icon: "/icons/crm.png" },
        { label: "Punto de venta", icon: "/icons/punto_venta.png" },
        { label: "Restaurante", icon: "/icons/restaurante.png" },
        { label: "Facturación", icon: "/icons/facturacion.png" },
        { label: "Firma electrónica", icon: "/icons/firma_electronica.png" },
        { label: "Suscripciones", icon: "/icons/suscripciones.png" },
        { label: "Alquiler", icon: "/icons/alquiler.png" },
        { label: "Servicio de campo", icon: "/icons/servicio_campo.png" },
      ],
    },
    {
      title: "OPERACIONES",
      items: [
        { label: "Contabilidad", icon: "/icons/contabilidad.png" },
        { label: "Información", icon: "/icons/informacion.png" },
        { label: "Proyecto", icon: "/icons/proyecto.png" },
        { label: "Partes de horas", icon: "/icons/partes_horas.png" },
        { label: "Servicio de asistencia", icon: "/icons/asistencia.png" },
        { label: "Inventario", icon: "/icons/inventario.png" },
        { label: "Compra", icon: "/icons/compra.png" },
        { label: "Documentos", icon: "/icons/documentos.png" },
      ],
    },
    {
  title: "ANÁLISIS Y REPORTES",
  items: [
    { label: "Gráficos de Ventas", icon: "/icons/graficos.png", route: "graficos" }, // ✅ Nueva opción
  ],
},
    {
      title: "FABRICACIÓN",
      items: [
        { label: "Fabricación", icon: "/icons/fabricacion.png" },
        { label: "Gestión del ciclo del producto", icon: "/icons/ciclo_producto.png" },
        { label: "Mantenimiento", icon: "/icons/mantenimiento.png" },
        { label: "Calidad", icon: "/icons/calidad.png" },
        { label: "Reparación", icon: "/icons/reparacion.png" },
      ],
    },
    {
      title: "MARKETING",
      items: [
        { label: "Marketing por correo electrónico", icon: "/icons/email_marketing.png" },
        { label: "Marketing por SMS", icon: "/icons/sms_marketing.png" },
        { label: "Automatización de marketing", icon: "/icons/automatizacion_marketing.png" },
        { label: "Eventos", icon: "/icons/eventos.png" },
        { label: "Marketing social", icon: "/icons/marketing_social.png" },
        { label: "Citas", icon: "/icons/citas.png" },
      ],
    },
    {
      title: "RECURSOS HUMANOS",
      items: [
        { label: "Empleados", icon: "/icons/empleados.png" },
        { label: "Asistencias", icon: "/icons/asistencias.png" },
        { label: "Reclutamiento", icon: "/icons/reclutamiento.png" },
        { label: "Referencias", icon: "/icons/referencias.png" },
        { label: "Flota", icon: "/icons/flota.png" },
        { label: "Gastos", icon: "/icons/gastos.png" },
        { label: "Planificación", icon: "/icons/planificacion.png" },
        { label: "Evaluación", icon: "/icons/evaluacion.png" },
      ],
    },
  ];

  // Array reactivo con las apps seleccionadas
  let selectedApps = [];

  function toggleApp(app) {
  if (app.route) {
    currentView = app.route;  // ✅ Ahora cambia a la pantalla de gráficos
  } else {
    const index = selectedApps.findIndex(a => a.label === app.label);
    if (index === -1) {
      selectedApps = [...selectedApps, app];
    } else {
      selectedApps = selectedApps.filter((_, i) => i !== index);
    }
  }
}


  // Verifica si una app está seleccionada
  function isSelected(app) {
    return selectedApps.some(a => a.label === app.label);
  }

   // Las 5 aplicaciones requeridas para el funcionamiento
   const requiredLabels = [
    "Empleados",
    "Ventas",
    "Facturación",
    "Inventario",
    "Compra"
  ];


  // Función para continuar: evalúa condiciones y, si se cumplen, cambia la vista a Home.svelte
  function continuar() {
    const hasAllRequired = requiredLabels.every(label =>
      selectedApps.some(app => app.label === label)
    );

    if (hasAllRequired) {
      if (selectedApps.length === 5) {
        // Se cumplen las condiciones; cambiamos la vista a 'home'
        currentView = 'home';
      } else {
        alert("Hay aplicaciones que no están disponibles");
      }
    } else {
      alert("Necesitas más aplicaciones para el funcionamiento");
    }
  }

  onMount(() => {
    // Inicializaciones adicionales si se necesitan
  });
</script>

{#if authenticated}
  <NavBar />
  {#if currentView === 'selection'}
    <!-- Vista de selección -->
    <div class="container">
      <!-- Panel izquierdo: Categorías -->
      <div class="left-panel">
        {#each categories as category}
          <div class="category">
            <h2 class="category-title">{category.title}</h2>
            <div class="category-items">
              {#each category.items as item}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="app-card" on:click={() => toggleApp(item)}>
                  <div class="app-info">
                    <img src={item.icon} alt={item.label} class="app-icon" />
                    <span>{item.label}</span>
                  </div>
                  <!-- Checkbox: se muestra marcado si la app está seleccionada -->
                  <input type="checkbox" checked={isSelected(item)} readonly />
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <!-- Panel derecho: (Aquí se muestra la cuenta de apps seleccionadas y el botón Continuar) -->
      <div class="right-panel">
        <p class="selected-title">
          {selectedApps.length} App{selectedApps.length !== 1 ? 's' : ''} seleccionada{selectedApps.length !== 1 ? 's' : ''}
        </p>

        {#if selectedApps.length > 0}
          <ul class="selected-list">
            {#each selectedApps as app}
              <li class="selected-item">
                <img src={app.icon} alt={app.label} class="selected-item-icon" />
                <span>{app.label}</span>
              </li>
            {/each}
          </ul>
          <p class="free-text">
            Gratis, con número ilimitado de usuarios para siempre.
          </p>
        {/if}

        <button class="continue-button" on:click={continuar}>
          Continuar
        </button>
      </div>
    </div>
    {:else if currentView === 'home'}
    <Home />
  {:else if currentView === 'graficos'}  <!-- ✅ Nueva pantalla -->
    <Graficos />
  {/if}
  
{:else}
  <Login />
{/if}

<style>
  /* Reset básico */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .container {
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    font-family: sans-serif;
  }
  /* Panel izquierdo */
  .left-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .category-title {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
  }
  .category-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  .app-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .app-card:hover {
    background-color: #f9f9f9;
  }
  .app-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .app-icon {
    width: 24px;
    height: 24px;
  }
  input[type="checkbox"] {
    pointer-events: none;
  }
  /* Panel derecho */
  .right-panel {
    width: 280px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .selected-title {
    font-weight: bold;
  }
  .selected-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .selected-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #eee;
  }
  .selected-item-icon {
    width: 20px;
    height: 20px;
  }
  .free-text {
    font-size: 0.85rem;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #eee;
    text-align: center;
  }
  .continue-button {
    background-color: #8052ff;
    color: #fff;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  .continue-button:hover {
    background-color: #6638ff;
  }
  /* Responsivo */
  @media (max-width: 1000px) {
    .category-items {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 600px) {
    .container {
      flex-direction: column;
    }
    .right-panel {
      width: 100%;
      margin-top: 1rem;
    }
    .category-items {
      grid-template-columns: 1fr;
    }
  }
</style>
