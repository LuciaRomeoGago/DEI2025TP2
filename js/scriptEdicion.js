const cadenaParametros = window.location.search;
const parametrosBusqueda = new URLSearchParams(cadenaParametros);
console.log(cadenaParametros);

function obtenerParametroUrl(nombreParametro) {
    return parametrosBusqueda.get(nombreParametro) || '';
}

// Espera que contenido HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Prerellena formulario 
    const camposFormulario = ["nombre", "edad", "fecha-nacimiento", "genero"];

    camposFormulario.forEach(idCampo => {
        const elemento = document.getElementById(idCampo);
        if (elemento) {
            elemento.value = obtenerParametroUrl(idCampo);
        }
    });

    // Manejo para radio button 'estado-civil'
    const estadoCivilInicial = obtenerParametroUrl("estado-civil");
    if (estadoCivilInicial) {
        const elementoRadio = document.getElementById(estadoCivilInicial);
        if (elementoRadio) {
            elementoRadio.checked = true;
        }
    }

    // Manejo envio  Formulario (Guardar Cambios) 
    const formularioEdicion = document.getElementById("editForm");
    if (formularioEdicion) {
        formularioEdicion.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Evita el envío normal

            const datosFormulario = new FormData(formularioEdicion);
            const nuevosParametrosBusqueda = new URLSearchParams(datosFormulario);

            // Construye URL para volver a pag de vista con  datos actualizados
            const nuevaUrl = `tercerPaso.html?${nuevosParametrosBusqueda.toString()}`;
            window.location.href = nuevaUrl; // Redirige
        });
    }
});