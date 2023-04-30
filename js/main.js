let productos = [];

fetch("../js/productos.json")
    .then(respuesta => respuesta.json())
    .then(info => {
        productos = info;
        agregarProductos(productos);
    })

const contenidoProductos = document.querySelector("#contenido-productos");
const botonesCategoria = document.querySelectorAll(".boton-categ");
const tituloPrincipal = document.querySelector("#titulo-tienda");
let botonesAñadir = document.querySelectorAll(".producto-añadir");
const conteo = document.querySelector("#conteo");


function agregarProductos(productosElegidos) {

    contenidoProductos.innerHTML = [];

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.img}">
            <div class="producto-detalles">
                <h3 class="producto-nombre">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-añadir" id="${producto.id}">Añadir a carrito</button>
            </div>
        `;

        contenidoProductos.append(div);
    })

    actualizarBotones();
}

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (z) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        z.currentTarget.classList.add("active");

        if (z.currentTarget.id != "todos"){
            const productoTipo = productos.find(producto => producto.categoria.id === z.currentTarget.id);
            tituloPrincipal.innerText = productoTipo.categoria.nombre;

            const productosFiltro = productos.filter(producto => producto.categoria.id === z.currentTarget.id);
            agregarProductos(productosFiltro);
        } else {
            tituloPrincipal.innerText = " Todos los productos";
            agregarProductos(productos);
        }
    })
});

let productoEnCarrito;

let productoEnCarritoLS = localStorage.getItem("producto-carrito");


if (productoEnCarritoLS){
    productoEnCarrito = JSON.parse(productoEnCarritoLS);
    actualizarConteo();
}else{
    productoEnCarrito = [];
}


function agregarProductoACarrito(producto) {
    
    Toastify({
        text: "Producto agregado al carrito",
        duration: 2000,
        gravity: "bottom", 
        stopOnFocus: true, 
        style: {
            background: "#3d3d3d",
            borderRadius: "1rem",
        },
    }).showToast();

    if (productoEnCarrito.find(p => p.id === producto.id)) {
        const indice = productoEnCarrito.findIndex(p => p.id === producto.id);
        productoEnCarrito[indice].cantidad++;
    } else {
        producto.cantidad = 1;
        productoEnCarrito.push(producto);
    }
    
    
    actualizarConteoCarrito();
    localStorage.setItem("producto-carrito", JSON.stringify(productoEnCarrito));
}

function actualizarConteoCarrito() {
    const nuevoConteo = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    conteo.innerText = nuevoConteo;
}

function añadirCarrito() {
    const botonId = this.id;
    const productoAñadido = productos.find(producto => producto.id === botonId);

    if (productoAñadido) {
        agregarProductoACarrito(productoAñadido);
    }
}

function actualizarBotones() {
    botonesAñadir = document.querySelectorAll(".producto-añadir");

    botonesAñadir.forEach(boton => {
        boton.addEventListener("click", añadirCarrito);
    });

    actualizarConteoCarrito();
}
