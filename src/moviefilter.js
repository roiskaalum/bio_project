// Inside movie.html
document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);  // Get query string
    const genre = params.get('genre');  // Get the value of the "genre" parameter
    const htmlElement = document.getElementById("movie-list");

    if (genre) {
        // You can now use the genre to display the relevant content
        console.log(`Genre selected: ${genre}`);
        displayByGenre(genre, htmlElement);
        return;
        // For example, you could filter movies by the selected genre or load data based on it
    } else {
        console.log("No genre parameter found");
    }

    params = new URLSearchParams(window.location.search);
    const title = params.get('title');

    if(title){
        console.log(title);
        displayByTitle(title, htmlElement);
    } else {
        console.log("No Title, this can't happen, something went wrong. Display Empty Page.");
        htmlElement.innerHTML = "<h1>Something went wrong</h1>";
    }
});

async function displayByGenre(genre, htmlElement) {
    try
    {
        // 1. First await the loadMovies completion
        const response = await loadMovies(htmlElement);
        console.log("Load response: ", response);

        if(!response || !response.ok)
        {
            throw new Error(response?.error || "Failed to load movies");
        }


        // 2. Now query for the movie elements
        const movieDivs = htmlElement.querySelectorAll(".movie-div");
        
        // 3. Process each movie element
        movieDivs.forEach(item => {
            // Show all movies initially
            item.classList.remove("hidden");
            
            // Find all genre buttons for this movie
            const genreButtons = item.querySelectorAll(".genre-btn");
            
            // Check if this movie has the selected genre
            const hasGenre = Array.from(genreButtons).some(
                btn => btn.textContent === genre
            );
            
            // Hide if it doesn't match the selected genre
            if (!hasGenre)
            {
                item.classList.add("hidden");
            }
        });
    } catch (error)
    {
        console.error("Error in displayByGenre:", error);
        htmlElement.innerHTML = "<h1>Something went wrong while fetching by genre</h1>";
    }
}
async function displayByTitle(title, htmlElement) {
    console.log(jsonURL);
    await fetchMoviesData(jsonURL)
    .then(() => {
        const movieRef = moviesArr.find(movie => movie.title === title)
        const movieTitle = movieRef.title.replace(/_/g, " ");
        const titleElem = document.createElement("h4");
        titleElem.classList.add("single-movie-title");
        titleElem.innerText = movieTitle;

        console.log(title);
        console.log(movieRef.title);
        console.log(movieTitle);

        const imgElem = document.createElement("img");
        const imgURL = movieRef.images.base;
        imgElem.src = imgURL;
        imgElem.classList.add("single-movie-img");
        imgElem.alt = "Image of ${movieTitle}";

        const descriptionElem = document.createElement("p");
        descriptionElem.innerText = movieRef.description.long;
        descriptionElem.classList.add("single-movie-description");
        const button = document.createElement("button");
        button.classList.add("order-ticket-btn");
        button.setAttribute("data-type", movieRef.title);
        button.onclick = function() {
            const movieTitleBtn = button.getAttribute("data-type");
            window.location.href = `order.html?title = ${encodeURIComponent(movieTitleBtn)}`;
        };

        htmlElement.appendChild(imgElem);
        htmlElement.appendChild(titleElem);
        htmlElement.appendChild(descriptionElem);
        htmlElement.appendChild(button);
    });
}