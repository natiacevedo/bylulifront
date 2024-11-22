import { getLocalStorage, imprimir } from "./utils/functions.js";

export const imprimirAñadidos = () => {
    let añadidos = getLocalStorage("productosAñadidos") || [];
    let contenidoGuardado = [];

     añadidos.forEach((productoData) => {
        let produ = new pelicula(productoData.id, productoData.nombre, productoData.precio, productoData.descripcion, productoData.imagen);
        console.log(produ);
        return (
            contenidoGuardado.push(produ.mostrarEnLista(producto,false))
        )
    } )
    console.log(añadidos, contenidoGuardado);
    imprimir("añadidos", `<h2>Tus productos elegidos</h2>`+ contenidoGuardado);
    document.querySelectorAll(".eliminar-btn").forEach((button)=> button.addEventListener("click", ()=> 
        eliminarFavoritas(button.getAttribute("data-id"))))
}

imprimirAñadidos();