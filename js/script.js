let listadoSeries = null;

fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then((response) => {
        listadoSeries = response;
    });

let peliculasFiltradas = null;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnBuscar").addEventListener("click", () => {
        if (!listadoSeries) {
            console.warn("El listado de series es falsy")
            return
        }

        // Filtrar peliculas
        peliculasFiltradas = [];
        const criterioBusqueda = document.getElementById("inputBuscar").value;
        peliculasFiltradas = listadoSeries.filter((pelicula) => {
            for (const atributo of ["title", "genres", "tagline", "overview"]) {
                if ((pelicula[atributo]).includes(criterioBusqueda))
                    return true
            }
            return false
        })

        // Insertar peliculas filtradas
        const lista = document.getElementById("lista")
        lista.innerHTML = "";
        peliculasFiltradas.forEach((pelicula) => {
            const listItem = document.createElement("li");
            listItem.className = "container"
            listItem.innerHTML = 
                "<div class='row' style='color: white; margin-bottom: 1.5rem'>" +
                    "<div class='col-10'>" +
                        "<div class='row'>" +
                            pelicula.title +
                        "</div>" +
                        "<div class='row'>" +
                            pelicula.tagline +
                        "</div>" +
                    "</div>" +
                    "<div class='col'>" +
                    crearElementoEstrellas(pelicula.vote_average).innerHTML +
                    "</div>" +
                "</div>"
            lista.append(listItem);
        })

    })
})

function crearElementoEstrellas(puntaje) {
    const wrapper = document.createElement("div");
    const asdf = ``
    const cantidadEstrellas = Math.round(puntaje/2)
    wrapper.innerHTML =
        `<span class="fa fa-star ${(cantidadEstrellas >= 1)? "checked" : ""}"></span>`+
        `<span class="fa fa-star ${(cantidadEstrellas >= 2)? "checked" : ""}"></span>`+
        `<span class="fa fa-star ${(cantidadEstrellas >= 3)? "checked" : ""}"></span>`+
        `<span class="fa fa-star ${(cantidadEstrellas >= 4)? "checked" : ""}"></span>`+
        `<span class="fa fa-star ${(cantidadEstrellas >= 5)? "checked" : ""}"></span>`
    return wrapper
}