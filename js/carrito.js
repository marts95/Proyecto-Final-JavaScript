let productoEnCarrito = JSON.parse(localStorage.getItem("producto-carrito"));
productoEnCarrito = JSON.parse(productoEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#productos-carrito");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesBorrar = document.querySelectorAll(".carrito-producto-borrar");
const botonVaciar = document.querySelector("#carrito-vacio");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-comprado");

function agregarProductosCarrito(){
    if (productoEnCarrito && productoEnCarrito.lenght > 0){

        carritoVacio.classList.add("desactivado");
        carritoProductos.classList.remove("desactivado");
        carritoAcciones.classList.remove("desactivado");
        carritoComprado.classList.add("desactivado");
    
        carritoProductos.innerHTML = [];
    
        productoEnCarrito.forEach(producto => {
            const div = document.createElement(div);
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
    
            carritoProductos.append(div);
        })
        
    } else{
        carritoVacio.classList.remove("desactivado");
        carritoProductos.classList.add("desactivado");
        carritoAcciones.classList.add("desactivado");
        carritoComprado.classList.add("desactivado");
    
    }
    actualizarBotonesBorrar();
    actulizarTotal()
}

agregarProductosCarrito();


function actualizarBotonesBorrar(){
    botonesBorrar = document.querySelectorAll(".carrito-producto-borrar");

    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    })
}

function eliminarCarrito(){
    const botonId = z.currentTarget.id;
    const productoBorrado = productoEnCarrito.find(producto => producto.id ===botonId);
    const indice = productoEnCarrito.findIndex(producto => producto.id === botonId);

    productoEnCarrito.splice(indice, 1);
    agregarProductosCarrito();

    localStorage.setItem("productos-carrito", JSON.stringify(productoEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito())
function vaciarCarrito(){

    productoEnCarrito.lenght = 0;
    localStorage.setItem("producto-carrito", JSON.stringify(productoEnCarrito));
    agregarProductosCarrito();
}

function actulizarTotal(){
    const totalFinal = productoEnCarrito.reduce((acc, producto => acc + (producto.precio * producto.cantidad)), 0);
    total.innerText = `$${totalFinal}`;

}

botonComprar.addEventListener("click", comprarCarrito())
function comprarCarrito(){

    productoEnCarrito.lenght = 0;
    localStorage.setItem("producto-carrito", JSON.stringify(productoEnCarrito));

    carritoVacio.classList.add("desactivado");
    carritoProductos.classList.add("desactivado");
    carritoAcciones.classList.add("desactivado");
    carritoComprado.classList.remove("desactivado");
}