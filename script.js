// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    console.log('¡Página de fresas cargada correctamente!');

    const botonFresas = document.querySelector('.btn-fresas');

    botonFresas.addEventListener('click', (e) => {
        e.preventDefault();

        const urlDestino = botonFresas.href;

        // Vibración háptica (solo Android, iOS la ignora)
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 20, 10]);
        }

        // Estado "cargando" tipo app profesional
        botonFresas.classList.add('loading');

        // Pequeña pausa para que se vea la animación
        setTimeout(() => {
            window.location.href = urlDestino;
        }, 350);
    });

});
