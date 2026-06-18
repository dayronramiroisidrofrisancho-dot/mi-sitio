// Esperar a que el documento cargue por completo
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-admin");
    const alerta = document.getElementById("mensaje-alerta");

    // Credenciales de prueba simuladas
    const USUARIO_CORRECTO = "admin2026";
    const CLAVE_CORRECTA = "Mundial*2026";

    // Escuchar el evento de envío del formulario
    formulario.addEventListener("submit", (evento) => {
        // Evitar que la página se recargue automáticamente
        evento.preventDefault();

        // Capturar los valores ingresados por el usuario
        const usuarioIngresado = document.getElementById("admin-user").value.trim();
        const claveIngresada = document.getElementById("admin-password").value;

        // Validar credenciales
        if (usuarioIngresado === USUARIO_CORRECTO && claveIngresada === CLAVE_CORRECTA) {
            // Caso de éxito
            mostrarMensaje("¡Acceso concedido! Redireccionando al panel...", "exito");
            
            // Simular tiempo de carga antes de cambiar de página (2 segundos)
            setTimeout(() => {
                // Suponiendo que el panel estadístico principal se llama 'index.html'
                // O puedes cambiarlo al nombre del archivo de tu panel de control
                window.location.href = "index.html"; 
            }, 2000);

        } else {
            // Caso de error
            mostrarMensaje("Usuario o contraseña incorrectos. Inténtalo de nuevo.", "error");
        }
    });

    // Función auxiliar para renderizar los mensajes de alerta en pantalla
    function mostrarMensaje(texto, tipo) {
        alerta.textContent = texto;
        alerta.className = ""; // Limpiar clases previas
        
        if (tipo === "exito") {
            alerta.classList.add("alerta-exito");
        } else if (tipo === "error") {
            alerta.classList.add("alerta-error");
        }
    }
});
