function fetchData()
{
    fetch('json_import_test/filmdata.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Http error" + response.status)
        }
        return response.json();
    })
    .then(data => createMovies(data))
    .catch(error => console.error("failed to fetch data", error))
    console.log("fetchData() called");
}
fetchData();

function createMovie(film) {
    return `
    <div class="image_div">
        <img src="json_import_test/${film.images.base}"></img>
    </div>`;
}

const moviediv = document.getElementById("image_test");

function createMovies(data)
{
    console.log("wtf!!")
    for (let i = 0; i < data.film.length; i++)
    {
        moviediv.innerHTML += createMovie(data.film[i])
    }
}