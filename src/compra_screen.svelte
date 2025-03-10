<script>
    // Array inicial de compras
    let compras = [
      { producto: "Pantalón", proveedor: "Proveedor A", cantidad: 10, fecha: "2023-01-20" },
      { producto: "Zapatos", proveedor: "Proveedor B", cantidad: 100, fecha: "2023-02-15" },
      { producto: "Camiseta", proveedor: "Proveedor C", cantidad: 3, fecha: "2023-03-05" }
    ];
  
    // Variables para controlar la visualización del formulario modal y almacenar datos del nuevo registro
    let showForm = false;
    let newProducto = "";
    let newProveedor = "";
    let newCantidad = "";
    let newFecha = "";
  
    // Función para agregar una nueva compra
    function addCompra() {
      if (newProducto && newProveedor && newCantidad && newFecha) {
        compras = [
          ...compras,
          { producto: newProducto, proveedor: newProveedor, cantidad: Number(newCantidad), fecha: newFecha }
        ];
        // Reseteamos los campos y ocultamos el formulario
        newProducto = "";
        newProveedor = "";
        newCantidad = "";
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
      newProveedor = "";
      newCantidad = "";
      newFecha = "";
    }
  </script>
  
  <!-- Botón "Nuevo" en la parte superior izquierda -->
  <div class="header">
    <button class="nuevo-button" on:click={showNewForm}>Nuevo</button>
  </div>
  
  <!-- Formulario modal para agregar una nueva compra -->
  {#if showForm}
    <div class="modal-overlay">
      <div class="modal">
        <h2>Agregar Nueva Compra</h2>
        <div class="form-group">
          <label>Producto:</label>
          <input type="text" bind:value={newProducto} />
        </div>
        <div class="form-group">
          <label>Proveedor:</label>
          <input type="text" bind:value={newProveedor} />
        </div>
        <div class="form-group">
          <label>Cantidad:</label>
          <input type="number" bind:value={newCantidad} />
        </div>
        <div class="form-group">
          <label>Fecha:</label>
          <input type="date" bind:value={newFecha} />
        </div>
        <div class="buttons">
          <button on:click={addCompra}>Agregar</button>
          <button on:click={cancelForm}>Cancelar</button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Listado de compras -->
  <div class="compras-container">
    <h1>Lista de Compras</h1>
    {#if compras.length > 0}
      <div class="cards-container">
        {#each compras as compra}
          <div class="card">
            <h2>{compra.producto}</h2>
            <p><strong>Proveedor:</strong> {compra.proveedor}</p>
            <p><strong>Cantidad:</strong> {compra.cantidad}</p>
            <p><strong>Fecha:</strong> {compra.fecha}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>No hay compras disponibles</p>
    {/if}
  </div>
  
  <style>
   /* Estilos inspirados en Odoo */



.header {
  background-color: #875A7B;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
}

.nuevo-button {
  background-color: #00A09D;
  color: white;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.nuevo-button:hover {
  background-color: #007a74;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal */
.modal {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-group label {
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.form-group input {
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.buttons {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.buttons button {
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  transition: all 0.3s;
}

.buttons button:first-child {
  background-color: #00A09D;
  color: white;
}

.buttons button:first-child:hover {
  background-color: #007a74;
}

.buttons button:last-child {
  background-color: #ccc;
}

.buttons button:last-child:hover {
  background-color: #b3b3b3;
}

.compras-container {
  padding: 2rem;
}

h1 {
  color: #4c4c4c;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 270px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #00A09D;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card h2 {
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.card p {
  color: #666;
  font-size: 1rem;
  margin: 0.2rem 0;
}

  </style>
  