There are a few syntax errors and logical issues in the code you provided. Here is a corrected version of your code with explanations of the changes:

javascript
let productoEnCarrito = localStorage.getItem("productos-carrito");
productoEnCarrito = JSON.parse(productoEnCarrito) || []; // initialize as an empty array if local storage is empty or invalid

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#productos-carrito");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesBorrar = document.querySelectorAll(".carrito-producto-borrar");
const botonVaciar = document.querySelector("#carrito-vacio");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-comprado");

function agregarProductosCarrito() {
  if (productoEnCarrito && productoEnCarrito.length > 0) {
    carritoVacio.classList.add("desactivado");
    carritoProductos.classList.remove("desactivado");
    carritoAcciones.classList.remove("desactivado");
    carritoComprado.classList.add("desactivado");

    carritoProductos.innerHTML = ""; // change to empty string to clear previous contents

    productoEnCarrito.forEach((producto) => {
      const div = document.createElement("div"); // specify the tag name as a string
      div.classList.add("carrito-producto");
      div.innerHTML = `
            <img src="${producto.img}">
            <div class="carrito-producto-nombre">
                <p>Nombre</p>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <p>Cantidad</p>
                <h3>${producto.cantidad}</h3>
            </div>
            <div class="carrito-producto-precio">
                <p>Precio</p>
                <h3>$${producto.precio}</h3>
            </div>
            <div class="carrito-producto-subtotal">
                <p>Subtotal</p>
                <h3>$${producto.precio * producto.cantidad}</h3>
            </div>
            <button class="carrito-producto-borrar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            `;

      carritoProductos.appendChild(div); // use appendChild() instead of append()
    });
  } else {
    carritoVacio.classList.remove("desactivado");
    carritoProductos.classList.add("desactivado");
    carritoAcciones.classList.add("desactivado");
    carritoComprado.classList.add("desactivado");
  }
  actualizarBotonesBorrar();
  actualizarTotal(); // fix typo in function name
}

agregarProductosCarrito();

function actualizarBotonesBorrar() {
  botonesBorrar = document.querySelectorAll(".carrito-producto-borrar");

  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", eliminarCarrito);
  });
}

function eliminarCarrito(e) { // fix parameter name
  const botonId = e.currentTarget.id; // fix typo in variable name
  const indice = productoEnCarrito.findIndex((producto) => producto.id === botonId);

  if (indice >= 0) { // check if index is valid
    productoEnCarrito.splice(indice, 1);
    localStorage.setItem("productos-carrito", JSON.stringify(productoEnCarrito));
    agregarProductosCarrito();
  }
}

botonVaciar.addEventListener("click", vaciarCarrito); // remove