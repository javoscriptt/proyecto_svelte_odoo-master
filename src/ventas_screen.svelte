<script>
    // Array inicial de ventas
    let ventas = [
      { producto: "Laptop", cliente: "Empresa A", monto: 1500, fecha: "2023-01-15" },
      { producto: "Smartphone", cliente: "Empresa B", monto: 800, fecha: "2023-02-20" },
      { producto: "Tablet", cliente: "Empresa C", monto: 500, fecha: "2023-03-10" }
    ];
  
    // Variables para controlar la visualización del formulario modal y almacenar datos de la nueva venta
    let showForm = false;
    let newProducto = "";
    let newCliente = "";
    let newMonto = "";
    let newFecha = "";
  
    // Función para agregar una nueva venta
    function addVenta() {
      if (newProducto && newCliente && newMonto && newFecha) {
        ventas = [
          ...ventas,
          { producto: newProducto, cliente: newCliente, monto: newMonto, fecha: newFecha }
        ];
        // Reseteamos los campos y ocultamos el formulario
        newProducto = "";
        newCliente = "";
        newMonto = "";
        newFecha = "";
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
      newProducto = "";
      newCliente = "";
      newMonto = "";
      newFecha = "";
    }
  </script>
  
  <!-- Botón "Nuevo" en la parte superior izquierda -->
  <div class="header">
    <button class="nuevo-button" on:click={showNewForm}>Nuevo</button>
  </div>
  
  <!-- Formulario modal para agregar una nueva venta -->
  {#if showForm}
    <div class="modal-overlay">
      <div class="modal">
        <h2>Agregar Nueva Venta</h2>
        <div class="form-group">
          <label>Producto:</label>
          <input type="text" bind:value={newProducto} />
        </div>
        <div class="form-group">
          <label>Cliente:</label>
          <input type="text" bind:value={newCliente} />
        </div>
        <div class="form-group">
          <label>Monto:</label>
          <input type="number" bind:value={newMonto} />
        </div>
        <div class="form-group">
          <label>Fecha:</label>
          <input type="date" bind:value={newFecha} />
        </div>
        <div class="buttons">
          <button on:click={addVenta}>Agregar</button>
          <button on:click={cancelForm}>Cancelar</button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Listado de ventas -->
  <div class="ventas-container">
    <h1>Lista de Ventas</h1>
    {#if ventas.length > 0}
      <div class="cards-container">
        {#each ventas as venta}
          <div class="card">
            <h2>{venta.producto}</h2>
            <p><strong>Cliente:</strong> {venta.cliente}</p>
            <p><strong>Monto:</strong> ${venta.monto}</p>
            <p><strong>Fecha:</strong> {venta.fecha}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>No hay ventas disponibles</p>
    {/if}
  </div>
  
  <style>
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
    .ventas-container {
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
  