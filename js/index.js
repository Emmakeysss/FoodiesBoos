//section carrito 

class item {
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

let tarjeta = document.querySelectorAll("#card");

const productos = [];
const carrito = {};

tarjeta.forEach(function (card){

     // section info cards

    let nombreDelProducto = card.querySelector("#title").textContent;
    let precioDelProducto = card.querySelector("#price").textContent;
    let precio = parseFloat(precioDelProducto.substring(1));
    let producto = new item(nombreDelProducto, precio);
    productos.push(producto);


    // section btn

    let boton = card.querySelector("#btn-orden");
    boton.addEventListener("click", agregarAlCarrito);

    function agregarAlCarrito() {
        if (carrito[nombreDelProducto]) {
            // Si el producto ya está en el carrito, aumenta la cantidad
            carrito[nombreDelProducto].cantidad++;
        } else {
            // Si es la primera vez que se agrega el producto, crea una entrada en el carrito
            carrito[nombreDelProducto] = {
                producto: producto,
                cantidad: 1
            };
        }
        
        console.log(carrito);
    }

    let btnCompra = document.getElementById("btn-compra");
    btnCompra.addEventListener("click", compraComfirmada);

    function compraComfirmada (){
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    let btnStorages = document.getElementById("btn-storages");
    btnStorages.addEventListener("click", traerStorages);

    function traerStorages (){
        let carritoDelStorage = JSON.parse(localStorage.getItem("carrito"));
        console.log(carritoDelStorage);
    }
});






  



// active navbar 

let nav = document.querySelector(".navegation-wrap");



window.onscroll = function () {
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("scroll-on")
    }else{
        nav.classList.remove("scroll-on")
    }
}

// nav hide 
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse")
navBar.forEach(function(a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show")
    })
})




// counter design
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration){
        let obj = document.getElementById(id),
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if(current == end){
                clearInterval(timer);
            }
        }, step)

    }
    counter("count1", 0, 1287, 3000)
    counter("count2", 100, 5786, 2500)
    counter("count3", 0, 1440, 3000)
    counter("count4", 0, 7110, 3000)
})