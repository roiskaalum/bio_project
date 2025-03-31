// Inside movie.html
document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);  // Get query string
    const genre = params.get('genre');  // Get the value of the "genre" parameter
    const htmlElement = document.getElementById("movie-list");

    if (genre) {
        if(htmlElement.classList.contains("single-movie-container"))
            htmlElement.classList.remove("single-movie-container");
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
        console.log("No Title or genre, display every movie.");
        loadMovies("movie-list", "id");
    }
});

async function displayByGenre(genre, htmlElement) {
    toggleFilter(1);
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
    toggleFilter();
    console.log(jsonURL);
    await fetchMoviesData(jsonURL)
    .then(() => {
        const movieRef = moviesArr.find(movie => movie.title === title)
        const movieTitle = movieRef.title.replace(/_/g, " ");
        const titleElem = document.createElement("h4");
        titleElem.classList.add("single-movie-title");
        titleElem.innerText = movieTitle;

        const imgElem = document.createElement("img");
        const imgURL = movieRef.images.base;
        imgElem.src = imgURL;
        imgElem.classList.add("single-movie-img");
        imgElem.alt = "Image of ${movieTitle}";



        // #region Age Element

        const ageMarker = document.createElement("p");
        ageMarker.innerText = "Aldersgrænse: ";
        ageMarker.classList.add("single-movie-description");
        ageMarker.classList.add("marker");
        
        const ageElem = document.createElement("p");
        ageElem.innerText = movieRef.aldersgrænse;
        ageElem.classList.add("single-movie-description");
        
        const ageContainer = document.createElement("div");
        ageContainer.classList.add("descriptionContainer");
        ageContainer.setAttribute("data-display", "row")
        
        ageContainer.appendChild(ageMarker);
        ageContainer.appendChild(ageElem);
        
        // #endregion Age Element



        // #region Description Element
        
        const descriptionMarker = document.createElement("p");
        descriptionMarker.innerText = "Beskrivelse:";
        descriptionMarker.classList.add("single-movie-description");
        descriptionMarker.classList.add("marker");
        
        const descriptionElem = document.createElement("p");
        descriptionElem.innerText = movieRef.description.long;
        descriptionElem.classList.add("single-movie-description");
        
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("descriptionContainer");
        
        descriptionContainer.appendChild(descriptionMarker);
        descriptionContainer.appendChild(descriptionElem);
        
        // #endregion Description Element


        // #region Genre Element

        const genreMarker = document.createElement("p");
        genreMarker.innerText = "Genre:";
        genreMarker.classList.add("single-movie-description");
        genreMarker.classList.add("marker");
        
        const genreElem = document.createElement("p");
        let genreText = "";
        movieRef.genre.forEach(item => { if(genreText == ""){ genreText = item; } else { genreText += ", " + item; } })
        genreElem.innerText = genreText + ".";
        genreElem.classList.add("single-movie-description");
        
        const genreContainer = document.createElement("div");
        genreContainer.classList.add("descriptionContainer");
        
        genreContainer.appendChild(genreMarker);
        genreContainer.appendChild(genreElem);

        // #endregion Genre Element

        // #region Director Element
        const directorMarker = document.createElement("p");
        directorMarker.innerText = "Direktør/er:";
        directorMarker.classList.add("single-movie-description");
        directorMarker.classList.add("marker");
        
        const directorElem = document.createElement("p");
        let directorhtml = "";
        if(!movieRef.director.length == 1)
        {
            movieRef.director.forEach(item => { if(directorhtml == ""){ directorhtml = item }else{ directorhtml += ", " + item } });
        }
        else
        {
            directorhtml = movieRef.director;
        }
        directorElem.innerText = directorhtml + ".";
        directorElem.classList.add("single-movie-description");
        
        const directorContainer = document.createElement("div");
        directorContainer.classList.add("descriptionContainer");
        
        directorContainer.appendChild(directorMarker);
        directorContainer.appendChild(directorElem);
            
        // #endregion Director Element
         
        
        // #region Genre Element

        const actorMarker = document.createElement("p");
        actorMarker.innerText = "Skuespillere:";
        actorMarker.classList.add("single-movie-description");
        actorMarker.classList.add("marker");
        
        const actorElem = document.createElement("p");
        let actorText = "";
        movieRef.actors.forEach(item => { if(actorText == ""){ actorText = item; } else { actorText += ", " + item; } })
        actorElem.innerText = actorText + ".";
        actorElem.classList.add("single-movie-description");
        
        const actorContainer = document.createElement("div");
        actorContainer.classList.add("descriptionContainer");
        
        actorContainer.appendChild(actorMarker);
        actorContainer.appendChild(actorElem);

        // #endregion Genre Element


        // #region Button Element
        
        const button = document.createElement("button");
        button.innerText = "Bestil Billet!";
        button.classList.add("order-ticket-btn");
        button.setAttribute("data-type", movieRef.title);
        button.onclick = function() {
            const movieTitleBtn = button.getAttribute("data-type");
            window.location.href = `timeslot.html?title=${encodeURIComponent(movieTitleBtn)}`;
        };
        
        // #endregion Button Element



        const titleAndDescriptionDiv = document.createElement("div");
        titleAndDescriptionDiv.classList.add("text-container");


        titleAndDescriptionDiv.appendChild(titleElem);
        titleAndDescriptionDiv.appendChild(ageContainer);
        titleAndDescriptionDiv.appendChild(descriptionContainer);
        titleAndDescriptionDiv.appendChild(genreContainer);
        titleAndDescriptionDiv.appendChild(directorContainer);
        titleAndDescriptionDiv.appendChild(actorContainer);
        titleAndDescriptionDiv.appendChild(button);

        htmlElement.appendChild(imgElem);
        htmlElement.appendChild(titleAndDescriptionDiv);
        htmlElement.classList.add("single-movie-container");
    });
}

function toggleFilter(number = 0) {
    let element = document.getElementsByClassName("search-section");
    if(number == 0)
        element[0].classList.toggle("hidden");
    else
    {
        if(element[0].classList.contains("hidden"))
            element[0].classList.toggle("hidden");

    }
        
}