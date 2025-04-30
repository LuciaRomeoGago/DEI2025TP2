const cadenaParametros = window.location.search;
const parametrosBusqueda = new URLSearchParams(cadenaParametros);

function obtenerParametroUrl(nombreParametro) {
    return parametrosBusqueda.get(nombreParametro) || '';
}

// Busca el div donde mostrar la info
const contenedor = document.getElementById("root");
if (contenedor) { 
    const camposAMostrar = {
        "nombre": "Nombre",
        "edad": "Edad",
        "fecha-nacimiento": "Fecha de Nacimiento",
        "genero": "Género",
        "estado-civil": "Estado Civil"
    };

    // para ir construyendo el html
    let contenidoHtml = ''; 

    for (const nombreParametro in camposAMostrar) {
        const etiqueta = camposAMostrar[nombreParametro];
        const valor = obtenerParametroUrl(nombreParametro); 
        contenidoHtml += `<p><strong>${etiqueta}:</strong> ${valor || 'No especificado'}</p>\n`;
    }
    contenedor.innerHTML = contenidoHtml; // Inserta el HTML en el div 'root'

    //  Manejo Botón Editar
    const botonEditar = document.getElementById("editar");
    if (botonEditar) {
        botonEditar.addEventListener("click", () => {
            const urlEdicion = `edicionTercerPaso.html${cadenaParametros}`;
            window.location.href = urlEdicion; // Redirige a la página de edición
        });
    }
}

//  Evitar Redirección del Formulario Principal (Próximo Paso)
const formularioPrincipal = document.querySelector('form'); 
if (formularioPrincipal) {
    formularioPrincipal.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita el envío por defecto (que iría a edicionTercerPaso.html según el action)
    });
   
}