// Funcionalidad para mostrar y ocultar el menú desplegable
document.getElementById('menuButton').addEventListener('click', function () {
    var menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('visible');
});

// Cerrar el menú si se hace clic fuera de él
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdownMenu');
    var button = document.getElementById('menuButton');
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove('visible');
    }
});

// Funcionalidad para el reconocimiento de voz en el input de búsqueda
if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Cambia el idioma si es necesario
    recognition.continuous = false;
    recognition.interimResults = false;

    var micButton = document.querySelector('.micro-icon');
    var searchInput = document.querySelector('.main-input input');

    micButton.addEventListener('click', function () {
        recognition.start();
    });

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz:', event.error);
        if (event.error === 'network') {
            alert('Error de red: No se pudo conectar con el servicio de reconocimiento de voz. Verifica tu conexión a Internet.');
        } else {
            alert('Ocurrió un error en el reconocimiento de voz: ' + event.error);
        }
    };

    recognition.onend = function () {
        console.log('Reconocimiento de voz finalizado.');
    };
} else {
    console.warn('El reconocimiento de voz no está disponible en este navegador.');
}
