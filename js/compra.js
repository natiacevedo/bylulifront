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

document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");

    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = document.getElementById("full-name").value.trim();
        const address = document.getElementById("address").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expirationDate = document.getElementById("expiration-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!fullName || !address || !cardNumber || !expirationDate || !cvv) {
            displayMessage("Por favor, completa todos los campos antes de enviar.", "error");
            return;
        }
        displayMessage("¡Pago realizado con éxito! Gracias por tu compra.", "success");
        paymentForm.reset();
    });

    function displayMessage(message, type) {
        const existingMessage = document.querySelector(".form-message");
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement("div");
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        paymentForm.appendChild(messageDiv);
    }
});

mostrarProductosCarrito();

