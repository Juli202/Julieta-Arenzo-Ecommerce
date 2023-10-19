fetch("data/products.json")
  .then((respuesta) => respuesta.json())
  .then(function (datos) {
    mostrarDetallesProducto(datos);
  });

function mostrarDetallesProducto(productos) {
  const obtenerSku = new URLSearchParams(location.search);
  const productoId = obtenerSku.get("sku");
  const productoSeleccionado = productos.find((producto) => producto.sku === productoId);

  const imagenElement = document.getElementById("imagen-producto");

  if (productoSeleccionado && imagenElement) {
    imagenElement.src = productoSeleccionado.imagen;
    imagenElement.alt = `Imagen del producto ${productoSeleccionado.nombre}`;
  }

  if (productoSeleccionado) {
    const nombreElement = document.getElementById("nombre-producto");
    const precioElement = document.getElementById("precio-producto");
    const descripcionElement = document.getElementById("descripcion-producto");
    const materialElement = document.getElementById("material-producto");
    const correaElement = document.getElementById("correa-producto");
    const movimientoElement = document.getElementById("movimiento-producto");

    nombreElement.innerHTML = productoSeleccionado.nombre;
    precioElement.innerHTML = `Precio: $${productoSeleccionado.precio}`;
    descripcionElement.innerHTML = productoSeleccionado.descripcion;
    materialElement.innerHTML = `Material: ${productoSeleccionado.material}`;
    correaElement.innerHTML = `Correa: ${productoSeleccionado.correa}`;
    movimientoElement.innerHTML = `Movimiento: ${productoSeleccionado.movimiento}`;
  }
   else {
    const nombreElement = document.getElementById("nombre-producto");
    nombreElement.innerHTML = "Producto no encontrado";
  }

  const cantidadElement = document.getElementById("cantidad-producto");
  const mensajeErrorElement = document.getElementById("mensaje-error");

  let cantidad = 1;
  cantidadElement.innerHTML = cantidad;

  function actualizarBotonesCantidad() {
    document.getElementById("btn-aumentar-cantidad").disabled = false;
    document.getElementById("btn-disminuir-cantidad").disabled = cantidad <= 1;
  }

  actualizarBotonesCantidad();

  document.getElementById("btn-aumentar-cantidad").addEventListener("click", (event) => {
    event.preventDefault();
    cantidad++;
    cantidadElement.innerHTML = cantidad;
    actualizarBotonesCantidad();
  });

  document.getElementById("btn-disminuir-cantidad").addEventListener("click", (event) => {
    event.preventDefault();
    if (cantidad > 1) {
      cantidad--;
      cantidadElement.innerHTML = cantidad;
    }
    actualizarBotonesCantidad();
  });

  document.getElementById("btn-agregar-carrito").addEventListener("click", () => {
    if (!productoSeleccionado) {
      mensajeErrorElement.innerHTML = "Producto no encontrado.";
      return; 
    }

    const cantidadSeleccionada = cantidad;


    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
    const productoExistente = carrito.find((producto) => producto.sku === productoSeleccionado.sku);

    if (productoExistente) {
      const confirmar = window.confirm(
        `"${productoSeleccionado.nombre}" ya está en tu carrito. ¿Quieres agregar más unidades?`
      );

      if (confirmar) {
        productoExistente.cantidad += cantidadSeleccionada;
      }
    } else {
      const productoParaAgregar = {
        sku: productoSeleccionado.sku,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        cantidad: cantidadSeleccionada,
        imagen: productoSeleccionado.imagen,
      };
      carrito.push(productoParaAgregar);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`"${productoSeleccionado.nombre}" se ha agregado al carrito.`);

    window.location.href = "cart.html";
  });
}