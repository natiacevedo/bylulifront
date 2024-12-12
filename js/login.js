import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion();

const botonLogin = document.querySelector("#form-login-submit");
const botonRegister = document.querySelector("#form-register-submit");
const loginContainer = document.getElementById("login-container");
const botonLogout = document.getElementById("boton-logout");

const usuarioLogueado = sessionStorage.getItem("session");

if (usuarioLogueado) {
    loginContainer.querySelector("#form-login").style.display = "none";
    loginContainer.querySelector("#login-title").style.display = "none"; 
    loginContainer.querySelector("#form-register").style.display = "none";
    loginContainer.querySelector("#register-title").style.display = "none";
    botonLogout.style.display = "block";
} else {
    loginContainer.querySelector("#form-login").style.display = "block";
    loginContainer.querySelector("#login-title").style.display = "block";
    loginContainer.querySelector("#form-register").style.display = "block";
    loginContainer.querySelector("#register-title").style.display = "block";
    botonLogout.style.display = "none";
}

botonLogin.addEventListener("click", () => {
    const email = obtenerValorInput("form-login-email");
    const password = obtenerValorInput("form-login-password");

    RequestsAPI.login(email, password)
        .then((data) => {
            sessionStorage.setItem("session", data.session);
            document.location.replace("index.html");
        })
        .catch((error) => {
            console.error(error);
            imprimir("form-login-error", "Email o contraseña incorrectos");
        });
});

botonRegister.addEventListener("click", () => {
    const nombre = obtenerValorInput("form-register-nombre");
    const apellido = obtenerValorInput("form-register-apellido");
    const email = obtenerValorInput("form-register-email");
    const password = obtenerValorInput("form-register-password");

    RequestsAPI.registrar(nombre, apellido, email, password)
        .then((data) => {
            if (data.success) {
                imprimir("form-register-error", "Registro exitoso. Puedes iniciar sesión ahora.");
            } else {
                imprimir("form-register-error", data.message || "Error en el registro.");
            }
        })
        .catch((error) => {
            console.error(error);
            imprimir("form-register-error", "Ocurrió un error al registrar. Inténtalo nuevamente.");
        });
});

botonLogout.addEventListener("click", () => {
    sessionStorage.removeItem("session");
    RequestsAPI.logout().then(() => {
        document.location.replace("login.html");
    });
});