const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);

// Obtiene un valor de parámetro de la URL
function getURLParam(param) {
    return searchParams.get(param) || '';
}

// Prerellena formulario en página de edición
if (window.location.pathname.includes("edicionTercerPaso.html")) { // accedo al archivo y verifico q se ejecute donde es 
    document.addEventListener('DOMContentLoaded', () => { // funcion anonima (=>) se ejecuta cuando contenido html se haya cargado
        document.getElementById("nombre").value = getURLParam("nombre"); //establece propiedad con valor del parametro
        document.getElementById("edad").value = getURLParam("edad");
        document.getElementById("fecha-nacimiento").value = getURLParam("fecha-nacimiento");
        document.getElementById("genero").value = getURLParam("genero");

        const estadoCivilInicial = getURLParam("estado-civil");
        if (estadoCivilInicial) {
            document.getElementById(estadoCivilInicial).checked = true;
        }

        const editForm = document.getElementById("editForm"); 
        editForm.addEventListener("submit", (event) => { 
            event.preventDefault(); // detiene que navegador recarge la pag,
                                    // si no lo pongo, cuando aprieto guardar cambios, no me devuelve a la pag anterior

            const nombre = document.getElementById("nombre").value; // obtiene el valor actual del campo de entrada
            const edad = document.getElementById("edad").value;
            const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
            const genero = document.getElementById("genero").value;
            const estadoCivil = document.querySelector('input[name="estado-civil"]:checked').value;

            //creo nueva url para dirigirme con los datos modificados
            const nuevaURL = `tercerPaso.html?nombre=${nombre}&edad=${edad}&fecha-nacimiento=${fechaNacimiento}&genero=${genero}&estado-civil=${estadoCivil}`;
            window.location.href = nuevaURL; // redirige el navegador a la url nueva del tercerpaso
        });
    });
} else if (window.location.pathname.includes("tercerPaso.html")) { //se ejecuta su pag actual es tercerPaso
    const contenedor = document.getElementById("root");
    if (contenedor) {
        const nombre = getURLParam("nombre");
        const edad = getURLParam("edad");
        const fechaNacimiento = getURLParam("fecha-nacimiento");
        const genero = getURLParam("genero");
        const estadoCivilInicial = getURLParam("estado-civil");

        //muestro la info obtenida de los parametros url
        contenedor.innerHTML = ` 
            <p><strong>Nombre:</strong> ${nombre || 'No especificado'}</p>
            <p><strong>Edad:</strong> ${edad || 'No especificada'}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento || 'No especificada'}</p>
            <p><strong>Género:</strong> ${genero || 'No seleccionado'}</p>
            <p><strong>Estado Civil:</strong> ${estadoCivilInicial || 'No seleccionado'}</p>
            <button id="editar">Modificar Detalles</button>
        `;

        const editarButton = document.getElementById("editar");
        editarButton.addEventListener("click", () => { //funcion anonima de nuevo y escuchador, cuando haga click en edutar, crea url de edicionTP anadiendo valores actuales del URL
            const urlEdicion = `edicionTercerPaso.html?nombre=${nombre}&edad=${edad}&fecha-nacimiento=${fechaNacimiento}&genero=${genero}&estado-civil=${estadoCivilInicial}`;
            window.location.href = urlEdicion; // redirijo navegador a url de edicionTP
        });
    }

    // Evita redirección del botón "Proximo Paso"
    const form = document.querySelector('form'); // selecciono 1er elemento form q este en el docu
    form.addEventListener('submit', (event) => { // escuchador cuando intento enviar formulario (submit)
        event.preventDefault(); // evito que formulario se vaya de nuevo al atributo action que lo tiene el editarTP
    
        // PROBAR NO SE SI FUNCIONA
        // si quiero agregar otra pagina para el proximo paso
    /*const paginaInicial="el html":
      hacer como editarButton
      winfow.location.href= paginaInicial;
    */

    });
}