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