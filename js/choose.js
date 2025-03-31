FindMovie();
const container = document.querySelector('.cinemaContainer');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('sitTal');
const total = document.getElementById('sittotal');
const number = document.getElementById('sitvalg');
const ticketPris = 70;

rememberChoice();

async function FindMovie() {
    await fetchMoviesData(jsonURL).then(() => {
        let params = new URLSearchParams(window.location.search);
        const title = params.get('title');
        const movieRef = moviesArr.find(movie => movie.title === title);

        if (!movieRef) return;

        const imgElem = document.createElement("img");
        imgElem.src = movieRef.images.base;
        imgElem.classList.add("single-movie-img");

        const html = document.getElementById('movie-list');
        html.innerHTML = "";
        html.appendChild(imgElem);
    });
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    const selectedSeatsCount = selectedSeats.length;
    const checkpop = document.getElementById("jatak");

    total.innerText = checkpop.checked ? selectedSeatsCount * ticketPris + 20 : selectedSeatsCount * ticketPris;
    count.innerText = selectedSeatsCount;

    // Save seats in localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndexes));
}

function rememberChoice() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

    seats.forEach((seat, index) => {
        if (selectedSeats.includes(index)) {
            seat.classList.add('selected');
        }
    });

    updateSelectedCount();
}

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".button").addEventListener("click", handleBetalBtnClick);
});

function handleBetalBtnClick(event) {
    const params = new URLSearchParams(window.location.search);
    const bookingData = {
        title: params.get('title'),
        hall: params.get('hall'),
        date: params.get('date'),
        day: params.get('day'),
        time: params.get('time'),
        selectedSeats: JSON.parse(localStorage.getItem('selectedSeats')) || []
    };

    // Save unfinished booking in localStorage
    localStorage.setItem('unfinishedBooking', JSON.stringify(bookingData));

    makePurchase(bookingData);
}

function makePurchase(data) {
    alert(`Du bestilte billetter til ${data.title} kl ${data.time} i hal ${data.hall}, ${data.day} dato ${data.date}`);
    const resume = confirm(`Vil du fortsætte til betaling?`);
    if(resume){
        // Clear unfinished booking after successful purchase
        localStorage.removeItem('unfinishedBooking');
        localStorage.removeItem('selectedSeats');
    }
    
}
