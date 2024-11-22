import { imprimir } from "../utils/helpers.js";

class Producto {
  id;
  nombre;
  precio;
  descripcion;
  imagen;
  constructor(id = 0, nombre = "", precio = 0, descripcion = "", imagen = "") {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }

  mostrarEnLista(producto, guardado) {
    return `
            <div class="item-lista-producto" >
                <img src="${this.imagen}" class="img-producto" id="${this.id}"></img>
                <div class="flex-row justify-content-between p-2">
                    <div>
                    <p>${this.nombre}</p>
                    <p>$${this.precio}</p>
                    </div>
                    <button type="button" id="guardar" class="guardar-btn btn btn-outline-light" data-id="${this.id}" data-nombre="${this.nombre}" data-precio="${this.precio}">+</button>
                    <button type="button" class="eliminar-btn btn btn-danger" data-id="${this.id}">-</button>
                    </div>
                </div>
                `;
  }

  mostrarDetalle() {
    console.log(this.nombre);

    return `
            <div class="item-producto" id="${this.id}">
                <h3>${this.nombre}</h3>
                <p>$${this.precio}</p>
                <p>${this.descripcion}</p>
                <img src="${this.imagen}" class="img-producto"></img>
            </div>
        `;
  }
}

document.addEventListener("click", (event) => {

  if (event.target.classList.contains("guardar-btn")) {
    const productId = event.target.getAttribute("data-id");
    agregarProductoAlLocalStorage(productId);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("eliminar-btn")) {
    const productId = event.target.getAttribute("data-id");
    eliminarProductoDeLocalStorage(productId);
  }
});

function agregarProductoAlLocalStorage(productId) {
  const producto = {
    id: productId,
    nombre: event.target.getAttribute("data-nombre"),
    precio: event.target.getAttribute("data-precio"),
  };

  let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  productosGuardados.push(producto);

  localStorage.setItem("productos", JSON.stringify(productosGuardados));

  console.log(`Producto ${producto.nombre} agregado al localStorage.`);
  mostrarProductosEnCarrito();
}


function eliminarProductoDeLocalStorage(productId) {
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  
    // Encontrar el índice del primer producto que coincide con el id
    const index = productosGuardados.findIndex((producto) => producto.id === productId);
  
    if (index !== -1) {
      // Eliminar el producto encontrado
      productosGuardados.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productosGuardados));
      console.log(`Producto con id ${productId} eliminado.`);
    } else {
      console.log(`No se encontró el producto con id ${productId}.`);
    }
  
    // Actualizar la cantidad de productos en el carrito
    mostrarProductosEnCarrito();
  }

const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
function mostrarProductosEnCarrito() {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const cantidadProductos = productosGuardados.length;

    const carritoCantidad = document.getElementById("carrito-cantidad");

    if (cantidadProductos > 0) {
        carritoCantidad.textContent = cantidadProductos;
        carritoCantidad.classList.add("visible");
    } else {
        carritoCantidad.classList.remove("visible");
    }

    imprimir("carrito-cantidad", cantidadProductos > 0 ? cantidadProductos : "");
}

    console.log("Productos guardados:", productosGuardados);
    console.log("cantidad de productos guardados:", productosGuardados.length);

export default Producto;