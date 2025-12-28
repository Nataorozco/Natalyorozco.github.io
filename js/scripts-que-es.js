document.addEventListener('DOMContentLoaded', function() {
    const abrirModalBtn = document.getElementById('abrirModalBtn');
    const miModal = document.getElementById('miModal');
    const cerrarModalBtn = document.querySelector('.cerrarModalBtn');

    // Función para abrir el modal
    abrirModalBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el navegador siga el href="#"
        miModal.style.display = 'block';
    });

    // Función para cerrar el modal haciendo clic en la "x"
    cerrarModalBtn.addEventListener('click', function() {
        miModal.style.display = 'none';
    });

    // Función para cerrar el modal haciendo clic fuera de su contenido
    window.addEventListener('click', function(event) {
        if (event.target == miModal) {
            miModal.style.display = 'none';
        }
    });

    // Opcional: Cerrar con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            miModal.style.display = 'none';
        }
    });
});
