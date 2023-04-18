//****** Productos ******//

const productos = [ { id: 1, titulo: "Facturas", img: "../fotos/facturastodas.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 1100},
                    { id: 2, titulo: "Tortas", img: "../fotos/tortas.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 1500},
                    { id: 3, titulo: "Alfajores", img: "../fotos/alfajorescuadrado.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 1500},
                    { id: 4, titulo: "Cupcakes", img: "../fotos/cupcakes_choc.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 2500},
                    { id: 5, titulo: "Pepitas", img: "../fotos/pepitas.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 2200},
                    { id: 6, titulo: "Cañoncitos", img: "../fotos/cañoncitos.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 3500},
                    { id: 7, titulo: "Galletas con chips", img: "../fotos/galle_chips_choc.jpg", categoria: {nombre: "Dulces", id: "dulce"}, precio: 2200},
                    { id: 8, titulo: "Bizcochos", img: "../fotos/bizcosalados.jpg", categoria: {nombre: "Salados", id: "salado"}, precio: 1500},
                    { id: 9, titulo: "Chipaquitos", img: "../fotos/chipaquitos.jpg", categoria: {nombre: "Salados", id: "salado"}, precio: 1600},
                    { id: 10, titulo: "Pan francés", img: "../fotos/panfrancés.jpg", categoria: {nombre: "Salados", id: "salado"}, precio: 500},
                    { id: 11, titulo: "Rosca de Pascua", img: "../fotos/rosca-pascua.jpg", categoria: {nombre: "Especialidades", id: "especialidad"}, precio: 2500},
                    { id: 11, titulo: "Pan dulce", img: "../fotos/pandulce.jpg", categoria: {nombre: "Especialidades", id: "especialidad"}, precio: 2000},
                    { id: 1, titulo: "Pan miga", img: "../fotos/panmiga.jpg", categoria: {nombre: "Especialidades", id: "especialidad"}, precio: 3500}];

//****** Funciones ******//

const contenidoProductos = document.querySelector("#contenido-productos");
const botonesCategoria = document.querySelectorAll(".boton-categ");
const tituloPrincipal = document.querySelector("#titulo-tienda");
let botonesAñadir = document.querySelectorAll(".producto-añadir");
const conteo = document.querySelector("#conteo");

function agregarProductos(productosElegidos) {

    contenidoProductos.innerHTML = "";

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
    actualizarBotones()
}

agregarProductos(productos); //????????????????//


function actualizarBotones(){
    botonesAñadir = document.querySelectorAll(".producto-añadir");

    botonesAñadir.forEach(boton => {
        boton.addEventListener("click", añadirCarrito);
    })
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
            agregarProductos(productos)
        }

    })
});

let productoEnCarrito;

let productoEnCarritoLS = localStorage.getItem("producto-carrito");


if (productoEnCarrritoLS){
    productoEnCarrito = JSON.parse(productoEnCarritoLS);
    actualizarConteo();
}else{
    productoEnCarrito = [];
};

function añadirCarrito(z){
    const botonId = z.currentTarget.id;
    const productoAñadido  = productos.find(producto => producto.id === botonId);

    if (productoEnCarrito.some(producto => producto.id === botonId)){
        const indice = productoEnCarrito.findIndex(producto => producto.id === botonId);
        productoEnCarrito[indice].cantidad++;
    } else{
        productoAñadido.cantidad = 1;
        productoEnCarrito.push(productoAñadido);}
        
    actualizarConteo();

    localStorage.setItem("productos-carrito", JSON.stringify(productoEnCarrito))
}

function actualizarConteo(){
    let conteo = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    conteo.innerText = conteo;

}