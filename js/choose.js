
FindMovie();
const container = document.querySelector('.cinemaContainer');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('sitTal');
const total = document.getElementById('sittotal');
const number = document.getElementById('sitvalg');
remberChoice();
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
    
    const seatIndex =[...selectedseats].map(function (seat){
        return [...seat].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
}

function remberChoice()
{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats !== null && selectedSeats.lenght > 0)
    {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > 1) {
                seat.classList.add('selected');
            }
        })
    }
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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("button")[0].addEventListener("click", handleBetalBtnClick);
});


function handleBetalBtnClick(event) {
    const params = new URLSearchParams(window.location.search);
    console.log("params:");
    console.log(params);
    console.log(params.get('title'));
    console.log(params.get('hall'));
    console.log(params.get('date'));
    console.log(params.get('day'));
    console.log(params.get('time'));
    makePurchase(params);
}

function makePurchase(params){
    alert(`Du bestilte biletter til ${params.get('title')} kl ${params.get('time')} i hal ${params.get('hall')} ${params.get('day')} dato ${params.get('date')}`);
}
