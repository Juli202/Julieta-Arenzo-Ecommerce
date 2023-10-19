fetch("data/products.json")
  .then((respuesta) => respuesta.json())
  .then(function (datos) {
    mostrarProductos(datos);
  });

  const reloj = document.getElementById("reloj");
  function alternarImagen() {
      if (reloj.src.includes("/images/reloj-shire-banner.png")) {
          reloj.src = "/images/reloj-snitch-banner.png";
      } else {
          reloj.src = "/images/reloj-shire-banner.png";
      }
  }
  setInterval(alternarImagen, 5000); 

function mostrarProductos(productos) {
  const listaProductos = document.querySelector(".lista-productos");

  productos.forEach(function (producto) {
    const itemProducto = document.createElement("li");
    itemProducto.classList.add("producto");

    const imagenElement = document.createElement("img");
    imagenElement.src = producto.imagen;
    imagenElement.classList.add("producto-imagen");

    const nombreElement = document.createElement("h3");
    nombreElement.innerHTML = producto.nombre;

    const precioElement = document.createElement("p");
    const precioFormateado = producto.precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0,
      });

    precioElement.innerHTML = precioFormateado;

   const botonComprar = document.createElement("button");
   botonComprar.innerHTML = "Comprar";
   botonComprar.classList.add("boton-comprar"); 
   botonComprar.addEventListener("click", function () {
     mostrarModal(producto);
   });
   
   const botonVer = document.createElement("button");
   botonVer.classList.add("boton-ver"); 
   const iconoVer = document.createElement("img");
   iconoVer.src = "/images/visibility-eye.svg"; 
   iconoVer.alt = "Ver";

   botonVer.appendChild(iconoVer);
   
   botonVer.addEventListener("click", function () {
  const productoId = producto.sku;
  window.location.assign(`details.html?sku=${productoId}`);
});

  itemProducto.append(imagenElement, nombreElement, precioElement, botonComprar, botonVer);
    listaProductos.appendChild(itemProducto);
  });
}


function mostrarModal(producto) {
  console.log("Mostrando modal");
  const modal = document.createElement("article");
  modal.className = "modal";

  modal.innerHTML = `
    <img src="${producto.imagen}" class="producto-imagen">
    <h3>${producto.nombre}</h3>
    <p>Precio: $<span class="precio-actualizado">${producto.precio}</span></p>
    <span class="botones-cantidad">
    <button class="boton-menos">-</button>
    <span class="cantidad">1</span>
    <button class="boton-mas">+</button>
    </span>
    <button class="boton-comprar-ahora">Comprar ahora</button>
    <button class="boton-cancelar"></button>`;

  document.body.appendChild(modal);

  const cantidadTexto = modal.querySelector(".cantidad");
  const botonMenos = modal.querySelector(".boton-menos");
  const botonMas = modal.querySelector(".boton-mas");
  const botonComprarAhora = modal.querySelector(".boton-comprar-ahora");
  const botonCancelar = modal.querySelector(".boton-cancelar");

botonMenos.addEventListener("click", function () {
  let cantidad = parseInt(cantidadTexto.textContent);
  if (cantidad > 1) {
    cantidad--;
    cantidadTexto.textContent = cantidad;
    actualizarPrecio(producto.precio, cantidad);
  }
  botonMenos.disabled = cantidad === 1;
});

botonMas.addEventListener("click", function () {
  let cantidad = parseInt(cantidadTexto.textContent);
  cantidad++;
  cantidadTexto.textContent = cantidad;
  actualizarPrecio(producto.precio, cantidad);
  botonMenos.disabled = cantidad === 1;
});

function actualizarPrecio(precio, cantidad) {
  const precioActualizado = precio * cantidad;
  const precioActualizadoElement = modal.querySelector(".precio-actualizado");
  precioActualizadoElement.textContent = precioActualizado;
}

  botonComprarAhora.addEventListener("click", function () {
    const cantidad = parseInt(cantidadTexto.textContent);
    if (cantidad > 0) {
      agregarAlCarrito(producto, cantidad);
      document.body.removeChild(modal);
    }
  });

  botonCancelar.addEventListener("click", function () {
    document.body.removeChild(modal);
  });
}

function agregarAlCarrito(producto, cantidad) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find((p) => p.sku === producto.sku);

  if (productoExistente) {
    const confirmar = window.confirm(
      `"${producto.nombre}" ya está en tu carrito. ¿Quieres agregar más unidades?`
    );

    if (confirmar) {
      productoExistente.cantidad += cantidad;
    }
  } else {
    const productoParaAgregar = {
      sku: producto.sku,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
      imagen: producto.imagen,
    };
    carrito.push(productoParaAgregar);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`"${producto.nombre}" se ha agregado al carrito.`);

    window.location.href = "cart.html";
}









