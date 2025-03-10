<script>
    // Array inicial de empleados
    let empleados = [
      { nombre: "Juan", apellido: "Perez", rol: "Desarrollador", trabajo: "Frontend" },
      { nombre: "Ana", apellido: "Gomez", rol: "Diseñadora", trabajo: "UI/UX" },
      { nombre: "Carlos", apellido: "Lopez", rol: "Gerente", trabajo: "Administración" }
    ];
  
    // Variables para controlar la visualización del formulario y almacenar datos del nuevo empleado
    let showForm = false;
    let newNombre = "";
    let newApellido = "";
    let newRol = "";
    let newTrabajo = "";
  
    // Función para agregar un nuevo empleado
    function addEmpleado() {
      if (newNombre && newApellido && newRol && newTrabajo) {
        empleados = [
          ...empleados,
          { nombre: newNombre, apellido: newApellido, rol: newRol, trabajo: newTrabajo }
        ];
        // Reseteamos los campos y ocultamos el formulario
        newNombre = "";
        newApellido = "";
        newRol = "";
        newTrabajo = "";
        showForm = false;
      } else {
        alert("Por favor, complete todos los campos");
      }
    }
  
    function showNewForm() {
      showForm = true;
    }
  
    function cancelForm() {
      showForm = false;
      newNombre = "";
      newApellido = "";
      newRol = "";
      newTrabajo = "";
    }
  </script>
  
  <!-- Botón "Nuevo" en la parte superior izquierda -->
  <div class="header">
    <button class="nuevo-button" on:click={showNewForm}>Nuevo</button>
  </div>
  
  <!-- Formulario modal para agregar un nuevo empleado -->
  {#if showForm}
    <div class="modal-overlay">
      <div class="modal">
        <h2>Agregar Nuevo Empleado</h2>
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" bind:value={newNombre} />
        </div>
        <div class="form-group">
          <label>Apellido:</label>
          <input type="text" bind:value={newApellido} />
        </div>
        <div class="form-group">
          <label>Rol:</label>
          <input type="text" bind:value={newRol} />
        </div>
        <div class="form-group">
          <label>Trabajo:</label>
          <input type="text" bind:value={newTrabajo} />
        </div>
        <div class="buttons">
          <button on:click={addEmpleado}>Agregar</button>
          <button on:click={cancelForm}>Cancelar</button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Listado de empleados -->
  <div class="empleados-container">
    <h1>Lista de Empleados</h1>
    {#if empleados.length > 0}
      <div class="cards-container">
        {#each empleados as empleado}
          <div class="card">
            <h2>{empleado.nombre} {empleado.apellido}</h2>
            <p><strong>Rol:</strong> {empleado.rol}</p>
            <p><strong>Trabajo:</strong> {empleado.trabajo}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>No hay empleados disponibles</p>
    {/if}
  </div>
  
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .header {
      padding: 1rem;
    }
    .nuevo-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
    /* Modal overlay */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    /* Modal */
    .modal {
      background-color: #fff;
      padding: 1.5rem;
      border-radius: 6px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5rem;
    }
    .form-group label {
      margin-bottom: 0.2rem;
    }
    .form-group input {
      padding: 0.4rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .buttons {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .buttons button {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    .empleados-container {
      padding: 2rem;
      font-family: sans-serif;
    }
    .cards-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 1rem;
      width: 250px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  </style>
  