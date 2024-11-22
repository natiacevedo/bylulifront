import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir } from "../utils/helpers.js";

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

const mostrarError = (error) => {
    imprimir("detalle-error", error);
}

const mostrarDetalle = (data) => {
    const producto = new Producto(data.id, data.nombre, data.precio, data.descripcion, data.imagen);
    imprimir("detalle", producto.mostrarDetalle())
}

RequestsAPI.getProducto(idProducto)
.then(mostrarDetalle)
.catch((error) => {
    mostrarError(error);
});