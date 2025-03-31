const container = document.querySelector('.cinemaContainer');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('sitTal');
const total = document.getElementById('sittotal');
//Skal give pris pr sæde

var ticketPris = 70;

function updateSelectedCount()
{
    const selectedseats = document.querySelectorAll('.row .seat.selected');

    const selectedseatsCount = selectedseats.length;

    count.innerText = selectedseatsCount;
    total.innerText = selectedseatsCount * ticketPris;

}

//sæde valg

container.addEventListener('click', e =>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});