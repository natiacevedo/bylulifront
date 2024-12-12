import { Producto } from "../Models/Producto.js";

import { RequestsAPI } from "../RequestsAPI.js";

import { imprimir } from "../utils/helpers.js";

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

const productosCarrito = document.getElementById("productos-carrito");

const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarProductosCarrito() {
    if (productosGuardados.length === 0) {
        productosCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        document.getElementById("amount").innerText = "0.00";
        return;
    }

    productosCarrito.innerHTML = "";

    let total = 0;

    productosGuardados.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");

        productoDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="me-4" width="100px">
                <p class="me-4">${producto.nombre}</p>
                <p class="me-4">Precio: $${producto.precio}</p>
                <button class="btn-eliminar btn" data-index="${index}">Eliminar</button>
            </div>
        `;

        total += parseFloat(producto.precio);

        productosCarrito.appendChild(productoDiv);
    });

    document.getElementById("amount").innerText = total.toFixed(2);

    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            eliminarProductoDelCarrito(index);
        });
    });
}

function eliminarProductoDelCarrito(index) {
    productosGuardados.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productosGuardados));
    mostrarProductosCarrito();
}

mostrarProductosCarrito();