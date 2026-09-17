// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('¡Página de fresas cargada correctamente!');

    // Opcional: Detectar el clic en el botón para hacer algo antes de redirigir
    const botonFresas = document.querySelector('.btn-fresas');
    
    botonFresas.addEventListener('click', (e) => {
        // Esto es solo un ejemplo por si quieres mostrar un mensaje o animación antes de ir al enlace
        console.log('El usuario hizo clic en el botón PRESPAR MIS FRESAS');
        
        // Si quisieras evitar que vaya al enlace y hacer otra cosa, usarías:
        // e.preventDefault(); 
    });

});