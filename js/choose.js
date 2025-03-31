
FindMovie();
const container = document.querySelector('.cinemaContainer');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('sitTal');
const total = document.getElementById('sittotal');
const number = document.getElementById('sitvalg');
//Skal give pris pr sæde


var ticketPris = 70;

async function FindMovie(){
    await fetchMoviesData(jsonURL)
    .then(() => {
        let params = new URLSearchParams(window.location.search);
        const title = params.get('title');
        const imgElem = document.createElement("img");
        const movieRef = moviesArr.find(movie => movie.title === title)
        
        console.log(title);
        console.log(params);
        console.log(imgElem);
        console.log(movieRef);

        const imgURL = movieRef.images.base;
        imgElem.src = imgURL;
        imgElem.classList.add("single-movie-img");
    
        const html = document.getElementById('movie-list');
        html.innerHTML = "";
        html.appendChild(imgElem);

        console.log(html);
        
    });
}


function updateSelectedCount()
{
    const selectedseats = document.querySelectorAll('.row .seat.selected');

    const selectedseatsCount = selectedseats.length;
    
    var checkpop = document.getElementById("jatak");
    if (checkpop.checked == true)
    {
        total.innerText = selectedseatsCount * ticketPris + 20;
    }
    else{
        total.innerText = selectedseatsCount * ticketPris;
    }
    
    count.innerText = selectedseatsCount;
    

}

/*function snack(){
var checkpop = document.getElementById("jatak");
if (checkpop.checked == true)
{
     20;
}
else{
    20;
}

}
*/
//sæde valg

container.addEventListener('click', e =>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

