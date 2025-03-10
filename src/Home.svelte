<script>
  import LoginScreen from './login_screen.svelte'; // Componente para el Login
  import EmpleadosScreen from './empleados_screen.svelte';
  import VentasScreen from './ventas_screen.svelte';
  import FacturacionScreen from './facturacion_screen.svelte';
  import InventarioScreen from './inventario_screen.svelte';
  import CompraScreen from './compra_screen.svelte';
  import GraficosScreen from './routes/graficos_screen.svelte';  import { user } from './stores/userStore'; // Asegúrate de que este archivo existe
  import ModuleIcon from './components/ModuleIcon.svelte';

  // Variable para manejar si el usuario está autenticado
  let isAuthenticated = false;

  // Variable para saber qué app se ha seleccionado
  let currentApp = '';

  // Definición de las aplicaciones requeridas
  const requiredApps = [
    { label: "Empleados", icon: "/icons/empleados.png", view: "empleados" },
    { label: "Ventas", icon: "/icons/ventas.png", view: "ventas" },
    { label: "Facturación", icon: "/icons/facturacion.png", view: "facturacion" },
    { label: "Inventario", icon: "/icons/inventario.png", view: "inventario" },
    { label: "Compra", icon: "/icons/compra.png", view: "compra" },
    { label: "Gráficos de Ventas", icon: "/icons/graficos.png", view: "graficos" } // Añadir la nueva aplicación
  ];

  // Mapeo de vista a componente
  const components = {
    empleados: EmpleadosScreen,
    ventas: VentasScreen,
    facturacion: FacturacionScreen,
    inventario: InventarioScreen,
    compra: CompraScreen,
    graficos: GraficosScreen // Añadir el componente de gráficos
  };

  // Función que se ejecuta al iniciar sesión correctamente
  function handleLoginSuccess() {
    isAuthenticated = true;
  }

  // Función para manejar el clic en una app
  function handleAppClick(app) {
    currentApp = app.view;
  }

  // Función para volver al menú principal
  function volver() {
    currentApp = '';
  }

  const modules = [
    { name: 'Ventas', icon: 'ventas.png', role: 'standard' },
    { name: 'Facturación', icon: 'facturacion.png', role: 'standard' },
    { name: 'Inventario', icon: 'inventario.png', role: 'admin' },
    { name: 'RRHH', icon: 'rrhh.png', role: 'admin' },
    { name: 'Estadísticas', icon: 'estadisticas.png', role: 'standard' }
  ];
</script>

{#if !isAuthenticated}
  <!-- Vista del Login -->
  <LoginScreen on:loginSuccess={handleLoginSuccess} />
{:else if currentApp === ''}
  <!-- Vista principal: lista de apps disponibles -->
  <div class="home-container">
    <h1>Bienvenido a Home</h1>
    <p>Selecciona una aplicación para ver su contenido.</p>
    
    <div class="apps-container">
      {#each requiredApps as app}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="app-card" on:click={() => handleAppClick(app)} tabindex="0" on:keydown={(e) => e.key === 'Enter' && handleAppClick(app)}>
          <img src={app.icon} alt={app.label} class="app-icon" />
          <span>{app.label}</span>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <!-- Vista de la app seleccionada -->
  <div class="app-content-container">
    <button class="back-button" on:click={volver}>← Volver</button>
    <svelte:component this={components[currentApp]} />
  </div>
{/if}

<style>
  .home-container {
    padding: 2rem;
    font-family: sans-serif;
    text-align: center;
  }
  .apps-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  .app-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1rem;
    width: 120px;
    transition: background-color 0.2s;
  }
  .app-card:hover {
    background-color: #f9f9f9;
  }
  .app-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 0.5rem;
  }
  .app-content-container {
    padding: 2rem;
    font-family: sans-serif;
  }
  .back-button {
    background-color: #ccc;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .back-button:hover {
    background-color: #bbb;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
</style>