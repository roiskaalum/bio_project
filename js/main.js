let moviesArr = null;
let jsonURL = "src/filmdata.json";
let moviesListElements = null;

async function fetchMoviesData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        moviesArr = data.film;  // Store the movies data globally
        return {
            ok: true,
            data: data,
            status: response.status
        };
    } catch (error) {
        console.error("Failed to fetch data", error);
        return {
            ok: false,
            error: error.message
        };
    }
}

function generateMovieList(targetElement) {
    // Clear existing content
    
    targetElement.innerHTML = "";
    moviesArr.forEach(item => {
        const movieDiv = createMovieElement(item);
        targetElement.appendChild(movieDiv);
    });
    moviesListElements = targetElement;
}

function createMovieElement(item) {
    const div = document.createElement("div");
    div.classList.add("movie-div");

    const a = document.createElement("a");
    a.href = `movie.html?title=${encodeURIComponent(item.title)}`;
    a.classList.add("movie-link");

    const newTitle = item.title.replace(/_/g, " ");
    const h4 = document.createElement("h4");
    h4.innerText = newTitle;

    const img = document.createElement("img");
    img.src = item.images.base;
    img.alt = item.images.base;
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img-div");
    imgDiv.appendChild(img);

    a.appendChild(h4);
    a.appendChild(imgDiv);

    const genreList = createGenreButtons(item.genre, item.title);

    div.appendChild(a);
    div.appendChild(genreList);

    return div;
}

function createGenreButtons(genres, movieTitle) {
    const genreList = document.createElement("div");
    genreList.classList.add("genre-list");

    genres.forEach(genre => {
        const genreBtn = document.createElement("button");
        genreBtn.classList.add("genre-btn");
        genreBtn.innerText = genre;
        genreBtn.addEventListener("click", () => {
            openGenrePage(genre);
        });

        genreList.appendChild(genreBtn);
    });

    return genreList;
}

function openGenrePage(genre) {
    // Encode the genre for URL safety
    const encodedGenre = encodeURIComponent(genre);
    window.location.href = `movie.html?genre=${encodedGenre}`;
}

// Example usage of the abstraction
async function loadMovies(htmlElement, id_class_html = "") {
    console.log(htmlElement);
    let movieListElement;
    if(id_class_html.toUpperCase() == "ID") {
        movieListElement = document.getElementById(htmlElement);
        console.log("ran 1st if");
    }
    else if(id_class_html.toUpperCase() == "CLASS")
    {
        movieListElement = document.getElementsByClassName(id_class_html)[0];
        console.log("ran 2nd if");
    }
    else if(id_class_html.toUpperCase() == "HTML")
    {
        movieListElement = document.getElementsByTagName(htmlElement);
        console.log("ran 3rd if");
    }
    else
    {
        movieListElement = document.getElementById("movie-list");
        console.log("ran 4th if");
    }
    try
    {
        if(moviesArr == null) {
            let response = await fetchMoviesData(jsonURL);
            console.log("Fetch response: ", response);
            if(!response.ok)
            {
                throw new Error(response.error || "Failed to fetch data");
            }
            generateMovieList(movieListElement);
            return response;
        }
        else
        {
            generateMovieList(movieListElement);
            return { ok: true };
        }
    }
    catch (error) {
        movieListElement.innerText = "Something went wrong, JSON fetching didn't respond in time";
        console.error("Load movies error:", error);
        return { ok: false, error: error.message };
    }
}

// Call the loadMovies function when the page loads or when needed
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;

    if(currentPage.includes("index.html"))
    {
        loadMovies("movie-list", "id");
    }
});
