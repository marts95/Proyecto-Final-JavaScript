const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#productos-carrito");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesBorrar = document.querySelectorAll(".carrito-producto-borrar");
const botonVaciar = document.querySelector("#acciones-vaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#acciones-comprar");

function agregarProductosCarrito() {
  if (productoEnCarrito.length > 0) {
    carritoVacio.classList.add("desactivado");
    carritoProductos.classList.remove("desactivado");
    carritoAcciones.classList.remove("desactivado");
    carritoComprado.classList.add("desactivado");

    carritoProductos.innerHTML = "";

    productoEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
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
            <button class="carrito-producto-borrar" id="${
              producto.id
            }"><i class="bi bi-trash"></i></button>
            `;

      carritoProductos.append(div);
    });

    actualizarBotonesBorrar();
    actualizarTotal();
  } else {
    carritoVacio.classList.remove("desactivado");
    carritoProductos.classList.add("desactivado");
    carritoAcciones.classList.add("desactivado");
    carritoComprado.classList.add("desactivado");
    
  }
}

agregarProductosCarrito();

function actualizarBotonesBorrar() {
  botonesBorrar = document.querySelectorAll(".carrito-producto-borrar");

  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", eliminarCarrito);
  });
}

function eliminarCarrito(z) {
  const botonId = z.currentTarget.id;
  const indice = productoEnCarrito.findIndex(
    (producto) => producto.id === parseInt(botonId)
  );

  if (indice >= 0) {
    productoEnCarrito.splice(indice, 1);
    agregarProductosCarrito();
    localStorage.setItem(
      "productos-carrito",
      JSON.stringify(productoEnCarrito)
    );
  } else {
    productoEnCarrito.length = 0;
    productoEnCarrito = [];
    carritoProductos.innerHTML = "";
  }
  actualizarBotonesBorrar();
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  Swal.fire({
    title: "¿Quieres continuar?",
    text: "Se eliminarán todos los productos de tu carrito.",
    imageUrl:
      "https://media.tenor.com/X73EqPfwAfIAAAAM/minion-any-questions-question.gif",
    imageWidth: "400",
    confirmButtonColor: "#c17767",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#3d3d3d",
    confirmButtonText: "Afirmativo",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
        productoEnCarrito.length = 0;
        localStorage.setItem(
          "productos-carrito",
          JSON.stringify(productoEnCarrito)
        );
        carritoProductos.innerHTML = "";
        agregarProductosCarrito();
          Swal.fire(
            "¡Vaciado!",
            "Su carrito fue vaciado con éxito",
            "success",
          );
            
    }


  });
}

function actualizarTotal() {
  const totalFinal = productoEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalFinal}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
  productoEnCarrito.length = 0;
  localStorage.setItem("productos-carrito", JSON.stringify(productoEnCarrito));
  carritoProductos.innerHTML = "";
  actualizarTotal();

  carritoVacio.classList.add("desactivado");
  carritoProductos.classList.add("desactivado");
  carritoAcciones.classList.add("desactivado");
  carritoComprado.classList.remove("desactivado");
}
