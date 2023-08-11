// Carrito

class item {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let tarjeta = document.querySelectorAll("#card");

const productos = [];
const carrito = {};

tarjeta.forEach(function (card) {

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
            carrito[nombreDelProducto].cantidad++;
        } else {
            carrito[nombreDelProducto] = {
                producto: producto,
                cantidad: 1
            };
        }
        actualizarCarritoEnHTML();
        guardarCarritoEnStorage();
    }

    function guardarCarritoEnStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function eliminarProducto(nombreProducto) {
        delete carrito[nombreProducto];
        actualizarCarritoEnHTML();
        guardarCarritoEnStorage();
    }

    function actualizarCarritoEnHTML() {
        let carritoContainer = document.getElementById("carrito-container");
        carritoContainer.innerHTML = "";

        for (let nombreProducto in carrito) {
            let productoEnCarrito = carrito[nombreProducto];
            let container = document.createElement("div");
            container.innerHTML = `
                <h2>nombre: ${productoEnCarrito.producto.nombre}</h2>
                <h2>precio: ${productoEnCarrito.producto.precio}</h2>
                <h2>cantidad: ${productoEnCarrito.cantidad}</h2>
                <button class="btnEliminar" data-producto="${nombreProducto}">Eliminar Producto</button>
            `;
            carritoContainer.appendChild(container);
            container.classList.add("carritostyle");

            let btnEliminar = container.querySelector(".btnEliminar");
            btnEliminar.addEventListener("click", () => {
                eliminarProducto(nombreProducto);
            });
        }
    }

    let botonStorage = document.getElementById("btn-storages");
    botonStorage.addEventListener("click", fetchCarritoFromLocalStorage);

    function fetchCarritoFromLocalStorage() {
        fetchLocalStorageData("carrito")
            .then(carritoDelStorage => {
                carrito = carritoDelStorage || {};
                actualizarCarritoEnHTML();
            })
            .catch(error => {
                console.error("Error fetching carrito data:", error);
            });
    }

    function fetchLocalStorageData(key) {
        return new Promise((resolve, reject) => {
            try {
                let data = localStorage.getItem(key);
                resolve(JSON.parse(data));
            } catch (error) {
                reject(error);
            }
        });
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