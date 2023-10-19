const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const numeroItemsElement = document.getElementById("numero-items");
const tablaCarrito = document.getElementById("tabla-carrito");
const totalPrecioElement = document.getElementById("total-precio");
const filaCarritoVacio = document.getElementById("fila-carrito-vacio");

function mostrarProductosEnCarrito() {
  let totalCompra = 0; 

  tablaCarrito.innerHTML = "";
  numeroItemsElement.textContent = carrito.length;

  if (carrito.length === 0) {
    filaCarritoVacio.style.display = "table-row";
  } else {
    filaCarritoVacio.style.display = "none";
  }

  carrito.forEach(function (producto) {
    const fila = document.createElement("tr");

    const detallesColumna = document.createElement("td");

    const imagenProducto = document.createElement("img");
    if (producto.imagen) {
      imagenProducto.src = producto.imagen;
      imagenProducto.alt = `Imagen del producto ${producto.nombre}`;
      imagenProducto.classList.add("producto-imagen");
    } else {
      imagenProducto.alt = "Imagen no disponible";
    }

    const nombreProducto = document.createTextNode(producto.nombre);

    detallesColumna.appendChild(imagenProducto);
    detallesColumna.appendChild(nombreProducto);

    const cantidadColumna = document.createElement("td");
    const botonMenos = document.createElement("button");
    botonMenos.textContent = "-";
    botonMenos.addEventListener("click", () => restarProducto(producto));
    const cantidadProducto = document.createTextNode(producto.cantidad);
    const botonMas = document.createElement("button");
    botonMas.textContent = "+";
    botonMas.addEventListener("click", () => sumarProducto(producto));
    cantidadColumna.appendChild(botonMenos);
    cantidadColumna.appendChild(cantidadProducto);
    cantidadColumna.appendChild(botonMas);

    if (producto.cantidad === 1) {
      botonMenos.disabled = true;
    }

    const precioColumna = document.createElement("td");
    const precioUnitario = document.createTextNode(`$${producto.precio}`);
    precioColumna.appendChild(precioUnitario);

    const subtotalColumna = document.createElement("td");
    const subtotal = producto.cantidad * producto.precio;
    const subtotalProducto = document.createTextNode(`$${subtotal}`);
    subtotalColumna.appendChild(subtotalProducto);
    totalCompra += subtotal; 

    const eliminarColumna = document.createElement("td");
    const eliminarIcono = document.createElement("img");
    eliminarIcono.src = "images/trash-bin.svg"; 
    eliminarIcono.alt = `Eliminar ${producto.nombre} del carrito`;
    eliminarIcono.classList.add("eliminar-icono");
    eliminarIcono.addEventListener("click", () => eliminarProductoDelCarrito(producto));

    eliminarColumna.appendChild(eliminarIcono);

    fila.appendChild(detallesColumna);
    fila.appendChild(cantidadColumna);
    fila.appendChild(precioColumna);
    fila.appendChild(subtotalColumna);
    fila.appendChild(eliminarColumna);

    tablaCarrito.appendChild(fila);
  });

  totalPrecioElement.textContent = totalCompra;
}

mostrarProductosEnCarrito();

function restarProducto(producto) {
  const index = carrito.findIndex((p) => p.sku === producto.sku);

  if (index !== -1) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad === 0) {
      carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductosEnCarrito();
  }
}

function sumarProducto(producto) {
  const index = carrito.findIndex((item) => item.sku === producto.sku);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
   
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarProductosEnCarrito();
}

function eliminarProductoDelCarrito(producto) {
  const indice = carrito.findIndex((p) => p.sku === producto.sku);
  if (indice !== -1) {
    carrito.splice(indice, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    mostrarProductosEnCarrito(); 
  }
}

function resetearCarrito() {
  carrito.length = 0;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarProductosEnCarrito();
}

const abrirModalButton = document.getElementById("abrir-modal");
const modal = document.getElementById("modal");
const formularioCompra = document.getElementById("formulario-compra");
const cerrarModalButton = document.getElementById("cerrar-modal");

abrirModalButton.addEventListener("click", () => {
  modal.showModal();
});

cerrarModalButton.addEventListener("click", () => {
  modal.close();
});

formularioCompra.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const metodoPago = document.getElementById("metodo-pago").value;

  if (!nombre || !apellido || !email || !metodoPago) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }
  resetearCarrito();
  alert("¡Su compra ha sido confirmada! Le llegará un correo a la dirección indicada.");
  formularioCompra.reset();
  modal.close();
});
