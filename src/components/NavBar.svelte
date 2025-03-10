<script>
  import { user } from '../stores/userStore';
  import { currentUser, isAuthenticated } from '../stores/authStores';

  function logout() {
    currentUser.set(null);
    isAuthenticated.set(false);
  }
</script>

<nav class="navbar">
  <div class="navbar-brand">
    <img src="\public\icons\logo.png" alt="Logo" class="logo" />
    <span class="brand-name">Odoo </span>
  </div>
  <div class="navbar-links">
    <a href="/">Inicio</a>
    <a href="empleados_screen.svelte">Acerca de</a>
    <a href="/contact">Contacto</a>
  </div>
  <div class="navbar-user">
    {#if $isAuthenticated}
      <span>{$user.username}</span>
      <button on:click={logout}>Cerrar sesión</button>
    {/if}
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;
  }
  .navbar-brand {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
  }
  .brand-name {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .navbar-links a {
    margin: 0 1rem;
    color: white;
    text-decoration: none;
  }
  .navbar-links a:hover {
    text-decoration: underline;
  }
  .navbar-user {
    display: flex;
    align-items: center;
  }
  .navbar-user span {
    margin-right: 1rem;
  }
  .navbar-user button {
    background-color: #555;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .navbar-user button:hover {
    background-color: #777;
  }
</style>
