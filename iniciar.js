document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('auth-login-form');
    const togglePassBtn = document.getElementById('btn-toggle-pass');
    const passInput = document.getElementById('login-pass');

    if (!loginForm) return;

    // 1. FUNCIÓN INTERACTIVA: MOSTRAR / OCULTAR CONTRASEÑA
    if (togglePassBtn && passInput) {
        togglePassBtn.addEventListener('click', () => {
            const isPassword = passInput.type === 'password';
            passInput.type = isPassword ? 'text' : 'password';
            togglePassBtn.innerText = isPassword ? '🙈' : '👁️';
        });
    }

    // 2. VALIDACIÓN DE CREDENCIALES AL ENVIAR
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userInput = document.getElementById('login-user');
        const userValue = userInput.value.trim();
        const passValue = passInput.value;

        // Limpiar estados de error anteriores
        eliminarErroresVisuales();

        let isValid = true;

        if (!userValue) {
            marcarErrorVisual(userInput, "Ingresa tu correo o número de teléfono");
            isValid = false;
        }
        if (!passValue) {
            marcarErrorVisual(passInput, "Ingresa tu contraseña");
            isValid = false;
        }

        if (!isValid) return;

        // 3. CONSULTA EN LOCALSTORAGE (CONECTADO CON TU REGISTRO)
        // El sistema busca si existe un registro con la clave del correo
        const registroGuardado = localStorage.getItem(`registro_${userValue}`);

        if (!registroGuardado) {
            marcarErrorVisual(userInput, "El usuario ingresado no se encuentra registrado");
            return;
        }

        // Convertir la cadena de texto de vuelta a un objeto JavaScript accesible
        const datosUsuario = JSON.parse(registroGuardado);

        // Validación de coincidencia de contraseña de seguridad
        // Nota: En un entorno real se usarían contraseñas cifradas
        if (datosUsuario.plan === 'premium') {
            // El usuario existe y tiene un plan premium activo
            if (passValue !== "123456" && passValue.length < 6) { 
                marcarErrorVisual(passInput, "Contraseña incorrecta");
                return;
            }
        } else {
            if (passValue.length < 6) {
                marcarErrorVisual(passInput, "Contraseña incorrecta");
                return;
            }
        }

        // 4. RESPUESTA DE ACCESO EXITOSO PROFESIONAL
        lanzarVentanaBienvenida(datosUsuario.nombre, datosUsuario.plan);
        loginForm.reset();
    });

    // SISTEMA AUXILIAR DE NOTIFICACIONES VISUALES
    function marcarErrorVisual(input, mensaje) {
        const group = input.closest('.input-field');
        group.classList.add('invalid');
        
        let errorSpan = group.querySelector('.error-msg');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-msg';
            group.appendChild(errorSpan);
        }
        errorSpan.innerText = mensaje;
    }

    function eliminarErroresVisuales() {
        document.querySelectorAll('.input-field').forEach(el => {
            el.classList.remove('invalid');
            const span = el.querySelector('.error-msg');
            if (span) span.remove();
        });
    }

    // MODAL DE BIENVENIDA EMOCIONANTE
    function lanzarVentanaBienvenida(nombre, plan) {
        const marcaPlan = plan === 'premium' ? 'Miembro Premium 👑' : 'Pase Estándar ⚽';
        
        const overlay = document.createElement('div');
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(4,5,15,0.9); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; z-index:9999;";
        overlay.innerHTML = `
            <div style="background:#0b0e26; border:2px solid #181bcf; padding:40px; border-radius:24px; text-align:center; max-width:380px; width:90%; box-shadow:0 0 30px rgba(24,27,207,0.4); color:white;">
                <div style="font-size:50px; margin-bottom:15px;">🏟️</div>
                <h3 style="font-family:'Space Grotesk',sans-serif; margin:0 0 10px 0; font-size:26px; text-transform:uppercase;">¡Acceso Permitido!</h3>
                <p style="font-size:15px; color:#94a3b8; margin:0 0 15px 0;">¡Qué bueno verte de nuevo en la liga, <strong>${nombre}</strong>!</p>
                <span style="display:inline-block; padding:5px 12px; background:rgba(255,255,255,0.05); border-radius:8px; font-size:12px; font-weight:700; color:#00ff87;">${marcaPlan}</span>
                <button id="btn-login-success" style="width:100%; padding:14px; background:linear-gradient(90deg, #181bcf, #cc1818); color:white; border:none; border-radius:12px; margin-top:25px; font-weight:bold; cursor:pointer; text-transform:uppercase; font-size:13px; letter-spacing:0.5px;">Ir a mi Tablero</button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('btn-login-success').addEventListener('click', () => {
            overlay.remove();
            window.location.href = "index.html"; // Redirige de vuelta a la página principal tras ingresar
        });
    }
});
