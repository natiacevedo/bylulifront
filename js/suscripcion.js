document.getElementById("subscribe-button").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
  
    if (nombre && apellido && email) {
      this.textContent = "¡Gracias por suscribirte!";
      this.classList.remove("btn-primary");
      this.classList.add("btn-success");
      this.disabled = true;
    } else {
      alert("Por favor, completa todos los campos antes de suscribirte.");
    }
  });