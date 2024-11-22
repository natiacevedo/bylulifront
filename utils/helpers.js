import { RequestsAPI } from "../RequestsAPI.js";

export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;

export const imprimir = (elemento, contenido) => {
    document.querySelector(`#${elemento}`).innerHTML=contenido
}

export const validarSesion = () =>{
    const usuarioLogueado = sessionStorage.getItem("session");
    const estaEnLogin = document.location.pathname.includes("login.html");
    const estaEnRegister = document.location.pathname.includes("register.html");

    /* if(usuarioLogueado){
        if(estaEnLogin || estaEnRegister){
            document.location.replace("index.html");
        }
    }else if(!estaEnLogin  || !estaEnRegister){
            document.location.replace("login.html");
        } */
}

export const eventoClickCerrarSesion = () => {
    document.querySelector("#boton-logout").addEventListener("click", 
        () => { sessionStorage.removeItem("session");
        RequestsAPI.logout().then(() => {
            document.location.replace("login.html");
        })
    })
}