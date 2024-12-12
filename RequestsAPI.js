const obtenerUrl = (ruta) => `${RequestsAPI.urlBase}/${ruta}`;

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
}

const token = sessionStorage.getItem("session");
if (token) {
    headers.Authorization = token;
}

const procesarRespuesta = (res) => {
    return res.json().then((data) => {
        if (data.error){
            throw new Error(data?.error);
        }

        return data;
    })
}

const manejarErrores = (error = new Error("Error desconocido")) => {
    console.error("Ha ocurrido un error:", error.message);
    throw error.message;
}
 
export class RequestsAPI {
    static urlBase = "https://byluliback.onrender.com";

    static login(email, password) {
        const body = JSON.stringify({ email, password });
        
        return fetch(obtenerUrl("login"), { method: "POST", body, headers })
            .then(procesarRespuesta)
            .catch(manejarErrores);
    }

    static logout() {
        return fetch(obtenerUrl("logout"), { method: "POST", headers })
            .then(procesarRespuesta)
            .catch(manejarErrores);
    }

    static getAllProducts(opciones = {}) {
        const queryParams = new URLSearchParams({});
    
        if (opciones.filtroNombre) {
            queryParams.set("nombre", opciones.filtroNombre);
        }
    
        if (opciones.filtroCategoria) {
            queryParams.set("categoria", opciones.filtroCategoria);
        }

        return fetch(obtenerUrl("productos?" + queryParams), { method: "GET", headers })
            .then(procesarRespuesta)
            .catch(manejarErrores);
    }

    static getProducto(idProducto) {
        return fetch(obtenerUrl(`producto/${idProducto}`), { headers })
            .then(procesarRespuesta)
            .catch(manejarErrores);
    }

    static registrar(nombre, apellido, email, password) {
        const body = JSON.stringify({ nombre, apellido, email, password });

        return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
            .then(procesarRespuesta)
            .catch(manejarErrores);
    }
}

export default RequestsAPI