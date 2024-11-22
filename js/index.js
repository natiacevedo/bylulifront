import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
  imprimir,
  obtenerValorInput,
  validarSesion,
  eventoClickCerrarSesion,
} from "../utils/helpers.js";

validarSesion();
eventoClickCerrarSesion();
const mostrarListaProductos = (data) => {
  imprimir("lista-error", "");
  const listadoProductos = data
    .map((producto) =>
      new Producto(
        producto.id,
        producto.nombre,
        producto.precio,
        producto.descripcion,
        producto.imagen
      ).mostrarEnLista()
    )
    .join("");

  imprimir("listado", `<table>${listadoProductos}</table>`);
  document.querySelectorAll(".img-producto").forEach((itemListado) => {
    itemListado.addEventListener("click", () => {
      document.location.replace(`detalle-producto.html?id=${itemListado.id}`);
    });
  });
};

const mostrarError = (error) => {
  imprimir("lista-error", error);
};

document.querySelector("#boton-filtro").addEventListener("click", () => {
  const filtroNombre = obtenerValorInput("input-filtro-nombre");
  const filtroCategoria = obtenerValorInput("input-filtro-categoria");

  RequestsAPI.getAllProducts({ filtroNombre, filtroCategoria })
    .then(mostrarListaProductos)
    .catch(mostrarError);
});

RequestsAPI.getAllProducts().then(mostrarListaProductos).catch(mostrarError);
