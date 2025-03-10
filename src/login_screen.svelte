<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let username = '';
    let password = '';
    let users = [];
    
    import usersData from '../data/users.json';
    users = usersData;
    
    async function login() {
      const user = users.find(u => u.username === username.trim() && u.password === password);
    
      if (user) {
        dispatch('loginSuccess', { role: user.role });
      } else {
        alert('Credenciales incorrectas');
      }
    }
  </script>
    
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Iniciar Sesión</h1>
      <input type="text" placeholder="Usuario" bind:value={username} class="login-input" />
      <input type="password" placeholder="Contraseña" bind:value={password} class="login-input" />
      <button on:click={login} class="login-button">Iniciar Sesión</button>
    </div>
  </div>
    
  <style>
   
  
    /* Tarjeta de login */
    .login-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 100%;
      max-width: 420px;
      text-align: center;
      border: 1px solid #e4e7ec;
    }
  
    /* Título */
    .login-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #5e2f8e; /* Color morado característico de Odoo */
      font-family: 'Arial', sans-serif;
    }
  
    /* Campos de entrada */
    .login-input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1.25rem;
      border: 1px solid #d1d8e0;
      border-radius: 4px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s;
      background-color: #f9fbfc;
      margin-left: -10px;
    }
  
    .login-input:focus {
      border-color: #5e2f8e; /* Morado Odoo */
      box-shadow: 0 0 5px rgba(94, 47, 142, 0.5);
    }
  
    /* Botón */
    .login-button {
      width: auto;
      padding: 0.75rem 2rem; /* Botón más pequeño */
      background-color: #5e2f8e; /* Color morado de Odoo */
      color: white;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s, box-shadow 0.3s;
      margin-top: 1rem;
      display: block;
      margin-left: auto;
      margin-right: auto; /* Botón centrado */
    }
  
    .login-button:hover {
      background-color: #4a2271; /* Morado más oscuro */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .login-button:active {
      background-color: #3e1c5a; /* Morado aún más oscuro */
    }
  </style>
  