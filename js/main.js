const URL = "https://fakestoreapi.com/products"
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || []
const productos = []
const contenedor = document.querySelector("div.contenedor#divcontenedor")
const iconCarrito = document.querySelector("img.icono")
const buscar = document.querySelector("input#buscarProducto")

function cardProducto({ image, title, price, id }) {
    return `<div class="card card-producto text-center">
                <img src="${image}" class="card-img-top img-producto">
                <div class="img-producto"></div>
                <div class="card-body">
                    <div class="card-title">${title}</div>
                    <div class="precio">$ ${price.toFixed(2)}</div>
                    <button id="${id}" class="btn btnAgregar">Agregar</button>
                </div>
            </div>`
}


function cargarProductos(prod) {
    contenedor.innerHTML = ""
    prod.length > 0 ? prod.forEach((producto) => contenedor.innerHTML += cardProducto(producto)) : contenedor.innerHTML = crearCardError()
    handlerBotonAgregar()
}
function handlerBotonAgregar() {
    const Agregar = document.querySelectorAll("button.btn")
    Agregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.id)
            const productoSeleccionado = productos.find((producto) => producto.id === id)
            carrito.push(productoSeleccionado)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            Swal.fire("Producto agregado al carrito")
        })
    })
}

function crearCardError() {
    return `<div class="card text-bg-danger mb-3 text-center">
                <div class="card-header">🤦🏻‍♂️</div>
                    <div class="card-body">
                    <h5 class="card-title">No pudimos cargar los productos</h5>
                    <p class="card-text">Intenta nuevamente en unos segundos.</p>
                </div>
            </div>`
}


async function obtenerProductos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        productos.push(...data)
        cargarProductos(data)
    } catch (error) {
        console.error(error)
        contenedor.innerHTML = crearCardError()
    }
}

obtenerProductos()

iconCarrito.addEventListener("mousemove", () => {
    iconCarrito.title = carrito.length > 0 ? `${carrito.length} productos en carrito` : "Carrito sin productos"
})

iconCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    if (carrito.length === 0) {
        Swal.fire("No tienes productos en el carrito, selecciona para comprar")
    } else {
        Swal.fire({
            title: `${carrito.length} productos en carrito \nDeseas confirmar la compra?`,
            showDenyButton: true,
            confirmButtonText: "Ir a carrito",
            denyButtonText: `Seguir comprando`
        }).then((result) => {
            if (result.isConfirmed) {
                location.href = "carrito.html"
            } else if (result.isDenied) {
                location.href = "index.html"
            }
        });
    }
})


buscar.addEventListener("search", () => {
    let busqueda = buscar.value.trim().toLowerCase()
    let resultado = productos.filter((producto) => producto.title.toLowerCase().includes(busqueda))
    resultado.length === 0 ? Swal.fire("Producto no encontrado, intenta de nuevo") : cargarProductos(resultado)
    buscar.value = ""
})






