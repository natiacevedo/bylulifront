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

  mostrarEnLista() {
    return `
      <div class="item-lista-producto" data-id="${this.id}">
          <img src="${this.imagen}" class="img-producto" id="${this.id}" />
          <div class="flex-row">
              <div class="texto-producto">
                  <p class="nombre-producto">${this.nombre}</p>
                  <p>$${this.precio}</p>
              </div>
              <div class="botones-producto">
                  <button type="button" class="guardar-btn" data-id="${this.id}" data-nombre="${this.nombre}" data-precio="${this.precio}" data-imagen="${this.imagen}">+</button>
                  <button type="button" class="eliminar-btn" data-id="${this.id}">-</button>
              </div>
          </div>
      </div>
    `;
  }

  mostrarDetalle() {
    return `
      <div class="item-producto" id="${this.id}">
          <h3>${this.nombre}</h3>
          <p>${this.descripcion}</p>
          <img src="${this.imagen}" class="img-producto"></img>
          <p class="mt-2">Precio: $${this.precio}</p>
          <button type="button" class="guardar-btn" data-id="${this.id}" data-nombre="${this.nombre}" data-precio="${this.precio}" data-imagen="${this.imagen}">Agregar al carrito</button>
          <button type="button" class="eliminar-btn" data-id="${this.id}">Eliminar del carrito</button>
      </div>
    `;
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("nombre-producto") || event.target.classList.contains("img-producto")) {
      const productId = event.target.closest('.item-lista-producto').getAttribute("data-id");
      window.location.href = `detalle-producto.html?id=${productId}`;
  }

  if (event.target.classList.contains("guardar-btn")) {
      const productId = event.target.getAttribute("data-id");
      agregarProductoAlLocalStorage(event, productId);
  }

  if (event.target.classList.contains("eliminar-btn")) {
      const productId = event.target.getAttribute("data-id");
      eliminarProductoDeLocalStorage(productId);
  }
});

function agregarProductoAlLocalStorage(event, productId) {
  const producto = {
      id: productId,
      nombre: event.target.getAttribute("data-nombre"),
      precio: event.target.getAttribute("data-precio"),
      imagen: event.target.getAttribute("data-imagen")
  };

  let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  
  const index = productosGuardados.findIndex(p => p.id === productId);
  
  if (index === -1) {
      productosGuardados.push(producto);
      console.log(`Producto ${producto.nombre} agregado al localStorage.`);
  } else {
      console.log(`El producto ${producto.nombre} ya está en el carrito.`);
  }

  localStorage.setItem("productos", JSON.stringify(productosGuardados));
  
  mostrarProductosEnCarrito();
}

function eliminarProductoDeLocalStorage(productId) {
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  
    const index = productosGuardados.findIndex((producto) => producto.id === productId);
  
    if (index !== -1) {
        productosGuardados.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(productosGuardados));
        console.log(`Producto con id ${productId} eliminado.`);
    } else {
        console.log(`No se encontró el producto con id ${productId}.`);
    }

    mostrarProductosEnCarrito();
}

function mostrarProductosEnCarrito() {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const cantidadProductos = productosGuardados.length;

    const carritoCantidad = document.getElementById("carrito-cantidad");

    if (cantidadProductos > 0) {
        carritoCantidad.textContent = cantidadProductos;
        carritoCantidad.classList.add("visible");
    } else {
        carritoCantidad.classList.remove("visible");
        carritoCantidad.textContent = "";
    }

    imprimir("carrito-cantidad", cantidadProductos > 0 ? cantidadProductos : "");
}

mostrarProductosEnCarrito();

export default Producto;