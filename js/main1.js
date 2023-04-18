console.log("Bienvenido saltamonte! Si desea conocer los precios de productos ingrese la funcion consPrecio() \nSi desea filtrar los productos por un rango de precio ingrese la funcion filtrarPrecio()\nSi desea comenzar su compra ingresa la funcion comprar()")

//Mensajes para prompts
const mjProdu =  "Ingresa el número del producto de su interes: \n" +
                    "1) Facturas \n" +
                    "2) Tortas \n" +
                    "3) Alfajores \n" +
                    "4) Bizcochos \n" +
                    "5) Cupcakes \n" + 
                    "6) Pepitas \n" 

const mjEnvio = "Ingresa el número de la localidad a la cual se hara el envio: \n" +
                    "1) La Banda \n" +
                    "2) Santiago Capital \n" +
                    "3) Clodomira \n"


//Funcion para realizar una compra
function comprar(){
    produ1 = parseInt(prompt(mjProdu))

    if (produ1 !== 1 && produ1 !== 2 && produ1 !== 3 && produ1 !== 4 && produ1 !== 5 && produ1!== 6){
        alert("El código del producto es incorrecto")
        return
    } else {
        switch(produ1){
            case 1:
                total = 1100
                break
            case 2:
                total = 1500
                break
            case 3:
                total = 1500
                break
            case 4:
                total = 1500
                break
            case 5:
                total = 2500
                break
            case 6:
                total = 2200
                break
            default: 
                console.log("Algo no funcinó bien. Este mensaje no lo debería ver.")
        }
        

        envio1 = parseInt(prompt(mjEnvio))

        if (envio1 !== 1 && envio1 !== 2 && envio1 !== 3 ){
            alert("El código de envio es incorrecto")
            return
        } else {
            switch(envio1){
                case 1:
                    totalcompra = total + 350
                    break
                case 2:
                    total1 = total + 700
                    break
                case 3:
                    total1 = total + 1000
                    break
                default: 
                    console.log("Algo no funcinó bien. Este mensaje no lo debería ver.")
            }
        }
        console.log( "El total de su compra es de $" + totalcompra)
        }
}

//FUNCIONES DE BUSQUEDA Y FILTRADO

//Array de productos
const productos = [ { cod:2356, producto: "facturas", precio: 1100},
                    { cod:4512, producto: "tortas", precio: 1500}, 
                    { cod:9156, producto: "alfajores", precio: 1500},
                    { cod:5151, producto: "bizcochos", precio: 1500}, 
                    { cod:2848, producto: "cupcakes", precio: 2500}, 
                    { cod:7215, producto: "pepitas", precio: 2200} ,
                    { cod:1515, producto: "cañoncitos", precio: 3500},
                    { cod:4894, producto: "chipaquitos", precio: 1600},
                    { cod:5115, producto: "galletas chips", precio: 2200},
                    { cod:1565, producto: "pan francés", precio: 500}];
                    
//Array solo nombres
//const nombres = productos.map((productos) => productos.producto);
//console.log(nombres)

console.log("Aquí tiene la lista de productos disponibles")
productos.forEach((producto) => {
    console.log(producto.producto);
})

//Funcion para consulta de precio de los productos
function consPrecio(){
    let codigo = parseInt(prompt("Ingrese el código (id) del producto que desea conocer su precio:"))
    const encontrar = productos.find(precio => precio.id === codigo)
    if (encontrar === undefined){
        console.log("El código id es incorrecto")}
        else{console.log(encontrar)}
}

//Funcion para filtrado de productos por precios
function filtrarPrecio(){
    let precio1 = parseInt(prompt("Ingresar precio minimo:"))
    let precio2 = parseInt(prompt("Ingresar precio maximo:"))
    const rangoPro = productos.filter((rango) => rango.precio < precio2 && rango.precio > precio1)
    console.log(rangoPro)
}

const totalCompra = productos.reduce((acumulador,producto) => acumulador + productos.precio, 0)
console.log(totalCompra)
