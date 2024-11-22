export const imprimir = (elemento, contenido) => {
    document.querySelector(`#${elemento}`).innerHTML = contenido;
  }
  
  export const click = (elemento, callback) => {
    document.querySelector(`#${elemento}`).addEventListener("click", callback);
  };
  
  export const setLocalStorage = (clave, valor) => {
    if (typeof valor === "object") {
        valor = JSON.stringify(valor);
    }
    localStorage.setItem(clave, valor);
  };
  
  export const getLocalStorage = (clave) => {
    let valor = localStorage.getItem(clave);
    try {return JSON.parse(valor);
      } catch (error) {
          return valor;
      }
  }; 