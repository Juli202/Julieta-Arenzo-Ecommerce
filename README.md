# Quantum E-commerce

Este es un proyecto de E - commerce que cuenta con tres páginas web: `index.html`, `details.html` y `cart.html`. El proyecto utiliza JavaScript para cargar datos de productos desde un archivo JSON y permite a los usuarios explorar productos, agregarlos al carrito y simular una compra. A continuación, se detalla cómo utilizar cada página:

## Uso

### `index.html`

- **Visualización y/o Compra de Productos**: En esta página, los usuarios pueden ver una lista de productos disponibles. Cada producto se muestra con su imagen, nombre, precio y botones "Comprar" y "Ver". Si los usuarios clickean "Ver" seran redirigidos a la pagina de detalles del producto. Si clickean "Comprar" agregan los productos al carrito directamente.

### `details.html`

- **Visualización de Detalles del Producto**: Esta página permite a los usuarios ver detalles más específicos sobre un producto seleccionado. Muestra el nombre del producto, su precio, descripción, material, correa y movimiento. Desde aquí, los usuarios pueden decidir agregar el producto al carrito o volver a la página de inicio  para explorar más productos.

- **Agregar al Carrito**: Los usuarios pueden ajustar la cantidad de productos a comprar y luego hacer clic en "Agregar al carrito". Esto añadirá el producto seleccionado al carrito.

- **Explorar Más Productos**: Los usuarios pueden hacer clic en "Seguir Comprando" para regresar a la página de inicio y continuar explorando otros productos.

### `cart.html`

- **Visualización del Carrito de Compras**: En esta página, los usuarios pueden ver una lista de productos que han agregado al carrito. Cada producto se muestra con su imagen, nombre, cantidad, precio por unidad, subtotal por elemento y precio total. Los usuarios pueden modificar la cantidad de productos, eliminar productos y ver el precio total de la compra.

- **Modificar el Carrito**: Los usuarios pueden aumentar o disminuir la cantidad de productos en el carrito. También tienen la opción de eliminar productos del carrito si lo desean.

- **Explorar Más Productos**: Los usuarios pueden hacer click en "Seguir Comprando" para volver a la página de inicio y explorar más productos antes de finalizar la compra.

- **Simulación de Compra**: Al hacer clic en "Continuar Compra," se muestra un modal donde los usuarios pueden completar sus datos para simular una compra.

## Funciones de JavaScript

### index.js
Este archivo se encarga principalmente de la lógica de la página de inicio (index.html). Las funciones y acciones que realiza son las siguientes:

**Cargar Datos de Productos** : Se carga la información de los productos desde un archivo JSON utilizando fetch. Los datos se utilizan para mostrar los productos en la página.

**Alternar Imagen del Banner**: Cada 5 segundos, cambia la imagen del banner en la página de inicio entre dos imágenes.

**Mostrar Productos en la Página**: La función mostrarProductos se encarga de tomar los datos de los productos y mostrarlos en la página de inicio. Para cada producto, se crea un elemento en el DOM con su imagen, nombre, precio y botones de "Comprar" y "Ver".

**Mostrar Modal al Hacer Clic en "Comprar"**: Al hacer clic en el botón "Comprar" de un producto, se muestra un modal que permite ajustar la cantidad del producto a comprar y agregarlo al carrito.

**Mostrar Detalles al Hacer Clic en "Ver"**: Al hacer clic en el botón "Ver" de un producto, se redirige a la página details.html con información detallada sobre el producto.

### details.js
Este archivo se encarga de la lógica de la página de detalles del producto (details.html). Realiza las siguientes acciones:

**Cargar Datos del Producto**: Al cargar la página, se toma el SKU del producto de la URL y se busca el producto correspondiente en los datos cargados desde el archivo JSON.

**Mostrar Detalles del Producto**: La función mostrarDetallesProducto muestra información detallada sobre el producto, incluyendo su nombre, precio, descripción y características.

**Controlar la Cantidad de Productos a Comprar**: Permite al usuario ajustar la cantidad de productos a comprar y luego agregar el producto al carrito.

### cart.js
Este archivo se encarga de la lógica de la página del carrito de compras (cart.html). Realiza las siguientes acciones:

**Obtener el Carrito del Almacenamiento Local**: Al cargar la página, obtiene la lista de productos en el carrito desde el almacenamiento local.

**Mostrar Productos en el Carrito**: La función mostrarProductosEnCarrito muestra los productos en el carrito, permite al usuario actualizar las cantidades y calcular el total de compra.

**Añadir Funcionalidad para Sumar, Restar y Eliminar Productos**: Permite al usuario aumentar o disminuir la cantidad de productos en el carrito usando "+" y "-" y eliminar productos del carrito utilizando el tacho de basura.

**Mostrar Modal de Compra**: Al hacer clic en el botón "Continuar Compra," se muestra un modal donde el usuario puede completar los datos necesarios para la simulación de la compra.

**Manejar el Envío del Formulario de Compra¨**: Al enviar el formulario de compra, se realiza una validación de campos obligatorios, se muestra un mensaje de confirmación, se borran los datos del formulario y se vacia el carrito.

## Falta terminar

Al 18/10/2023 , faltan estilos para
- El carrito cuando esta vacío y cuando esta lleno. 
- el formulario de simulación de compra
- los media queries para tablet y desktop

En cart.js falta 
- agregar la validacion de email en el formulario de simulacion de compra. 
- deshabilitar u ocultar el boton de continuar compra si el carrito esta vacio. 