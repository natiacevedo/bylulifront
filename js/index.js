import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
  imprimir,
  obtenerValorInput,
  validarSesion,
  eventoClickCerrarSesion,
} from "../utils/helpers.js";

validarSesion();/* 
eventoClickCerrarSesion(); */
const mostrarListaProductos = (data) => {
  if (!data || data.length === 0) {
    imprimir("listado", "<p>No se encontraron productos.</p>");
    return;
  }

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
};

document.querySelector("#boton-filtro").addEventListener("click", () => {
  const filtroNombre = obtenerValorInput("input-filtro-nombre");
  const filtroCategoria = obtenerValorInput("input-filtro-categoria");

  RequestsAPI.getAllProducts({ filtroNombre, filtroCategoria })
    .then((data) => {
      mostrarListaProductos(data);

      document.querySelector("#input-filtro-nombre").value = "";
    })
    .catch(mostrarError);
});

RequestsAPI.getAllProducts().then(mostrarListaProductos).catch(mostrarError);
