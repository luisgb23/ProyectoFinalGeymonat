const carrito =  JSON.parse(localStorage.getItem("miCarrito")) || []
const btnComprar = document.querySelector("button.btnComprar#comprar")
const totalCarritoCompra = document.querySelector("td#importeTotalCarrito")
const tableCarrito = document.querySelector("table.table tbody")
function crearFilaHTML({image, title, price}) {
    return `<tr>
                <td>
                    <img class="img-carrito" src=" ${image}" alt="${title}">
                </td>
                <td>${title}</td>
                <td>1<td>
                <td>$ ${price.toFixed(2)}</td>
            </tr>`
}

function cargarCarrito() {
    if (carrito.length > 0) {
        tableCarrito.innerHTML = ""
        carrito.forEach((producto) => {
            tableCarrito.innerHTML += crearFilaHTML(producto)
        })
        importeTotalCarrito()
    }
}

cargarCarrito()


btnComprar.addEventListener("click", (e)=>{
    e.preventDefault()
    carrito.length === 0 ?  
    Swal.fire({
        title: "No tienes productos en el carrito",
        html: `Presiona en <a href="index.html">Volver</a> para comprar algún producto`,
        icon: "warning"
    }) : 
    Swal.fire({
        title: "Compra realizada satisfactoriamente",
        text: "Muchas gracias por elegirnos!",
        icon: "success",
        confirmButtonText: "Seguir comprando!"
      }).then((result) => {
        if (result.isConfirmed) {
            limpiarCarrito()
        }
      });
})

function importeTotalCarrito() {
    let importeTotalCarrito = carrito.reduce((acc, producto)=> acc + producto.price, 0)
    totalCarritoCompra.textContent = `$ ${importeTotalCarrito.toFixed(2)}`
}

function limpiarCarrito(){
    localStorage.clear()
    location.href = "index.html"
}