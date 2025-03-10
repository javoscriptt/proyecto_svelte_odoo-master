<script>
    // Array inicial de ítems en inventario
    let inventario = [
      { producto: "Pantalon", cantidad: 50, ubicacion: "Almacén A" },
      { producto: "Camiseta", cantidad: 30, ubicacion: "Almacén B" },
      { producto: "Gorro", cantidad: 20, ubicacion: "Almacén A" }
    ];
  
    // Variables para controlar la visualización del formulario modal y almacenar datos del nuevo ítem
    let showForm = false;
    let newProducto = "";
    let newCantidad = "";
    let newUbicacion = "";
  
    // Función para agregar un nuevo ítem al inventario
    function addInventario() {
      if (newProducto && newCantidad && newUbicacion) {
        inventario = [
          ...inventario,
          { producto: newProducto, cantidad: Number(newCantidad), ubicacion: newUbicacion }
        ];
        // Reseteamos los campos y ocultamos el formulario
        newProducto = "";
        newCantidad = "";
        newUbicacion = "";
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
      newCantidad = "";
      newUbicacion = "";
    }
  </script>
  
  <!-- Botón "Nuevo" en la parte superior izquierda -->
  <div class="header">
    <button class="nuevo-button" on:click={showNewForm}>Nuevo</button>
  </div>
  
  <!-- Formulario modal para agregar un nuevo ítem de inventario -->
  {#if showForm}
    <div class="modal-overlay">
      <div class="modal">
        <h2>Agregar Nuevo Ítem de Inventario</h2>
        <div class="form-group">
          <label>Producto:</label>
          <input type="text" bind:value={newProducto} />
        </div>
        <div class="form-group">
          <label>Cantidad:</label>
          <input type="number" bind:value={newCantidad} />
        </div>
        <div class="form-group">
          <label>Ubicación:</label>
          <input type="text" bind:value={newUbicacion} />
        </div>
        <div class="buttons">
          <button on:click={addInventario}>Agregar</button>
          <button on:click={cancelForm}>Cancelar</button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Listado de inventario -->
  <div class="inventario-container">
    <h1>Lista de Inventario</h1>
    {#if inventario.length > 0}
      <div class="cards-container">
        {#each inventario as item}
          <div class="card">
            <h2>{item.producto}</h2>
            <p><strong>Cantidad:</strong> {item.cantidad}</p>
            <p><strong>Ubicación:</strong> {item.ubicacion}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>No hay ítems de inventario disponibles</p>
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
    .inventario-container {
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
  