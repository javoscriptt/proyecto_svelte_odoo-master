<script>
    // Array inicial de facturación
    let facturacion = [
      { factura: "FAC001", cliente: "Cliente A", fecha: "2023-01-10", total: 1200 },
      { factura: "FAC002", cliente: "Cliente B", fecha: "2023-02-05", total: 850 },
      { factura: "FAC003", cliente: "Cliente C", fecha: "2023-03-15", total: 1750 }
    ];
  
    // Variables para controlar la visualización del formulario modal y almacenar datos de la nueva factura
    let showForm = false;
    let newFactura = "";
    let newCliente = "";
    let newFecha = "";
    let newTotal = "";
  
    // Función para agregar una nueva factura
    function addFacturacion() {
      if (newFactura && newCliente && newFecha && newTotal) {
        facturacion = [
          ...facturacion,
          { factura: newFactura, cliente: newCliente, fecha: newFecha, total: Number(newTotal) }
        ];
        // Reseteamos los campos y ocultamos el formulario
        newFactura = "";
        newCliente = "";
        newFecha = "";
        newTotal = "";
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
      newFactura = "";
      newCliente = "";
      newFecha = "";
      newTotal = "";
    }
  </script>
  
  <!-- Botón "Nuevo" en la parte superior izquierda -->
  <div class="header">
    <button class="nuevo-button" on:click={showNewForm}>Nuevo</button>
  </div>
  
  <!-- Formulario modal para agregar una nueva factura -->
  {#if showForm}
    <div class="modal-overlay">
      <div class="modal">
        <h2>Agregar Nueva Factura</h2>
        <div class="form-group">
          <label>Factura:</label>
          <input type="text" bind:value={newFactura} placeholder="Número de factura" />
        </div>
        <div class="form-group">
          <label>Cliente:</label>
          <input type="text" bind:value={newCliente} placeholder="Nombre del cliente" />
        </div>
        <div class="form-group">
          <label>Fecha:</label>
          <input type="date" bind:value={newFecha} />
        </div>
        <div class="form-group">
          <label>Total:</label>
          <input type="number" bind:value={newTotal} placeholder="Monto total" />
        </div>
        <div class="buttons">
          <button on:click={addFacturacion}>Agregar</button>
          <button on:click={cancelForm}>Cancelar</button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Listado de facturación -->
  <div class="facturacion-container">
    <h1>Lista de Facturación</h1>
    {#if facturacion.length > 0}
      <div class="cards-container">
        {#each facturacion as item}
          <div class="card">
            <h2>{item.factura}</h2>
            <p><strong>Cliente:</strong> {item.cliente}</p>
            <p><strong>Fecha:</strong> {item.fecha}</p>
            <p><strong>Total:</strong> ${item.total}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>No hay facturas disponibles</p>
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
      background-color: rgba(0, 0, 0, 0.5);
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
    .facturacion-container {
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
  