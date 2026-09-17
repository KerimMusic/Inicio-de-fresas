// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    console.log('¡Página de fresas cargada correctamente!');

    const botonFresas = document.querySelector('.btn-fresas');
    const audio = document.getElementById('audioMordida');

    let yaPresionado = false; // evita doble ejecución

    /* ============================================================
       🔊 Reproducir audio INMEDIATAMENTE al presionar (pointerdown)
       ============================================================ */
    const reproducirSonido = () => {
        if (!audio) return;
        try {
            audio.currentTime = 0; // reinicia por si se repite
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.warn('Audio bloqueado o no disponible:', err);
                });
            }
        } catch (err) {
            console.warn('Error al reproducir audio:', err);
        }
    };

    // pointerdown cubre mouse + táctil + stylus y dispara al instante
    botonFresas.addEventListener('pointerdown', () => {
        reproducirSonido();
    }, { passive: true });

    // Fallback para navegadores antiguos sin pointer events
    botonFresas.addEventListener('touchstart', () => {
        reproducirSonido();
    }, { passive: true });

    /* ============================================================
       🚀 Al hacer clic: animación + redirigir cuando termine el audio
       ============================================================ */
    botonFresas.addEventListener('click', (e) => {
        e.preventDefault();

        if (yaPresionado) return;
        yaPresionado = true;

        const urlDestino = botonFresas.href;

        // Por si el pointerdown no se disparó (ej. teclado)
        if (audio && audio.paused) {
            reproducirSonido();
        }

        // Vibración háptica (solo Android)
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 20, 10]);
        }

        // Estado "cargando"
        botonFresas.classList.add('loading');

        // ⏱️ Tiempo máximo de espera antes de redirigir (por seguridad)
        const TIEMPO_MAXIMO = 1500; // 1.5s

        let redirigido = false;
        const redirigir = () => {
            if (redirigido) return;
            redirigido = true;
            window.location.href = urlDestino;
        };

        // Si hay audio, esperamos a que termine (o al máximo)
        if (audio && !isNaN(audio.duration) && audio.duration > 0) {
            const restante = Math.max(0, (audio.duration - audio.currentTime) * 1000);
            setTimeout(redirigir, Math.min(restante, TIEMPO_MAXIMO));
        } else {
            // Si aún no carga la duración, esperamos al máximo
            setTimeout(redirigir, TIEMPO_MAXIMO);
        }

        // Fallback por si el evento 'ended' no dispara
        if (audio) {
            audio.addEventListener('ended', redirigir, { once: true });
        }
    });

});
