document.addEventListener('DOMContentLoaded', function() {
    // Cinema configuration - multiple halls with different layouts
    const CINEMA_HALLS = [
        {
            id: 'hall-1',
            name: 'Sal 1 - Standard',
            rows: 8, // A-H
            cols: 10, // 1-10
            description: 'Standard biograf med 8 rækker (A-H) og 10 sæder per række'
        },
        {
            id: 'hall-2',
            name: 'Sal 2 - Premium',
            rows: 6, // A-F
            cols: 8, // 1-8
            description: 'Premium sal med bredere sæder - 6 rækker (A-F) og 8 sæder per række'
        },
        {
            id: 'hall-3',
            name: 'Sal 3 - Stor',
            rows: 10, // A-J
            cols: 12, // 1-12
            description: 'Stor sal med 10 rækker (A-J) og 12 sæder per række'
        },
        {
            id: 'hall-4',
            name: 'Sal 4 - VIP',
            rows: 5, // A-E
            cols: 6, // 1-6
            description: 'VIP sal med luksussæder - 5 rækker (A-E) og 6 sæder per række'
        }
    ];
    
    // Prices in DKK
    const TICKET_PRICE = 100.00;
    const POPCORN_PRICE = 35.00;
    const DRINK_PRICE = 25.00;
    const COMBO_PRICE = 50.00;
    const COMBO_DISCOUNT = (POPCORN_PRICE + DRINK_PRICE) - COMBO_PRICE;
    
    // State variables
    let selectedSeats = [];
    let ticketCount = 1;
    let currentHallId = CINEMA_HALLS[0].id;
    let cinemaState = {};
    
    // DOM elements
    const cinemaHall = document.getElementById('cinema-hall');
    const hallSelect = document.getElementById('cinema-hall-select');
    const hallInfo = document.getElementById('hall-info');
    const ticketCountInput = document.getElementById('ticket-count');
    const decreaseTicketsBtn = document.getElementById('decrease-tickets');
    const increaseTicketsBtn = document.getElementById('increase-tickets');
    const selectedSeatsInfo = document.getElementById('selected-seats-info');
    const checkoutButton = document.getElementById('checkout-button');
    const totalPriceElement = document.getElementById('total-price');
    const popcornSelect = document.getElementById('popcorn');
    const drinkSelect = document.getElementById('drink');
    const comboSelect = document.getElementById('combo');
    
    // Initialize the cinema halls
    function initializeCinemaHalls() {
        const savedState = localStorage.getItem('cinemaState');
        if (savedState) {
            return JSON.parse(savedState);
        }
        
        const state = {};
        
        CINEMA_HALLS.forEach(hall => {
            state[hall.id] = {};
            
            for (let row = 0; row < hall.rows; row++) {
                const rowLetter = String.fromCharCode(65 + row);
                state[hall.id][rowLetter] = {};
                
                for (let col = 1; col <= hall.cols; col++) {
                    state[hall.id][rowLetter][col] = Math.random() < 0.2 ? 'occupied' : 'free';
                }
            }
        });
        
        return state;
    }
    
    // Update extras dropdown options based on ticket count
    function updateExtrasOptions() {
        const maxExtras = Math.max(3, ticketCount); // Minimum 3, up to ticket count
        
        // Update popcorn options
        popcornSelect.innerHTML = '<option value="0">Ingen</option>';
        for (let i = 1; i <= maxExtras; i++) {
            popcornSelect.innerHTML += `<option value="${i}">${i} x ${POPCORN_PRICE * i} kr.</option>`;
        }
        
        // Update drink options
        drinkSelect.innerHTML = '<option value="0">Ingen</option>';
        for (let i = 1; i <= maxExtras; i++) {
            drinkSelect.innerHTML += `<option value="${i}">${i} x ${DRINK_PRICE * i} kr.</option>`;
        }
        
        // Update combo options
        comboSelect.innerHTML = '<option value="0">Ingen</option>';
        for (let i = 1; i <= maxExtras; i++) {
            comboSelect.innerHTML += `<option value="${i}">${i} x ${COMBO_PRICE * i} kr.</option>`;
        }
    }
    
    // Populate hall selection dropdown
    function populateHallSelection() {
        hallSelect.innerHTML = '';
        
        CINEMA_HALLS.forEach(hall => {
            const option = document.createElement('option');
            option.value = hall.id;
            option.textContent = hall.name;
            hallSelect.appendChild(option);
        });
    }
    
    // Update hall information display
    function updateHallInfo() {
        const hall = CINEMA_HALLS.find(h => h.id === currentHallId);
        if (hall) {
            hallInfo.textContent = hall.description;
        }
    }
    
    // Render the cinema hall
    function renderCinemaHall() {
        cinemaHall.innerHTML = '';
        
        const hall = CINEMA_HALLS.find(h => h.id === currentHallId);
        if (!hall) return;
        
        const hallState = cinemaState[currentHallId];
        
        for (let row = 0; row < hall.rows; row++) {
            const rowLetter = String.fromCharCode(65 + row);
            const rowElement = document.createElement('div');
            rowElement.className = 'seat-row';
            
            const rowLabel = document.createElement('div');
            rowLabel.className = 'row-label';
            rowLabel.textContent = rowLetter;
            rowElement.appendChild(rowLabel);
            
            for (let col = 1; col <= hall.cols; col++) {
                const seat = document.createElement('div');
                seat.className = 'seat';
                
                const seatStatus = hallState[rowLetter][col];
                seat.classList.add(seatStatus);
                
                if (selectedSeats.some(s => s.row === rowLetter && s.col === col)) {
                    seat.classList.remove('free');
                    seat.classList.add('selected');
                }
                
                seat.textContent = col;
                seat.dataset.row = rowLetter;
                seat.dataset.col = col;
                
                seat.addEventListener('click', handleSeatClick);
                
                rowElement.appendChild(seat);
            }
            
            cinemaHall.appendChild(rowElement);
        }
    }
    
    // Handle seat selection
    function handleSeatClick(event) {
        const seat = event.target;
        const row = seat.dataset.row;
        const col = parseInt(seat.dataset.col);
        
        if (cinemaState[currentHallId][row][col] === 'occupied') {
            return;
        }
        
        const seatIndex = selectedSeats.findIndex(s => s.row === row && s.col === col);
        
        if (seatIndex !== -1) {
            selectedSeats.splice(seatIndex, 1);
            seat.classList.remove('selected');
            seat.classList.add('free');
        } else {
            if (selectedSeats.length >= ticketCount) {
                alert(`Du kan kun vælge ${ticketCount} sæde(r) for ${ticketCount} billet(ter)`);
                return;
            }
            
            selectedSeats.push({ row, col });
            seat.classList.remove('free');
            seat.classList.add('selected');
        }
        
        updateSelectedSeatsInfo();
        calculateTotal();
    }
    
    // Update the selected seats info display
    function updateSelectedSeatsInfo() {
        selectedSeatsInfo.textContent = `Valgt: ${selectedSeats.length}/${ticketCount} sæde(r)`;
    }
    
    // Calculate and update the total price
    function calculateTotal() {
        const ticketsTotal = selectedSeats.length * TICKET_PRICE;
        
        const popcornCount = parseInt(popcornSelect.value);
        const drinkCount = parseInt(drinkSelect.value);
        const comboCount = parseInt(comboSelect.value);
        
        let extrasTotal = 0;
        extrasTotal += popcornCount * POPCORN_PRICE;
        extrasTotal += drinkCount * DRINK_PRICE;
        extrasTotal += comboCount * COMBO_PRICE;
        
        const total = ticketsTotal + extrasTotal;
        
        totalPriceElement.textContent = `Total: ${total.toFixed(2)} kr.`;
    }
    
    // Handle checkout
    function handleCheckout() {
        const name = document.getElementById('customer-name').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();
        
        if (!name || !phone) {
            alert('Indtast venligst dit navn og telefonnummer');
            return;
        }
        
        if (selectedSeats.length !== ticketCount) {
            alert(`Vælg venligst nøjagtigt ${ticketCount} sæde(r) til din bestilling`);
            return;
        }
        
        selectedSeats.forEach(seat => {
            cinemaState[currentHallId][seat.row][seat.col] = 'occupied';
        });
        
        const booking = {
            hall: currentHallId,
            hallName: CINEMA_HALLS.find(h => h.id === currentHallId).name,
            customer: {
                name,
                phone,
                email: document.getElementById('customer-email').value.trim()
            },
            seats: selectedSeats,
            tickets: ticketCount,
            extras: {
                popcorn: parseInt(popcornSelect.value),
                drink: parseInt(drinkSelect.value),
                combo: parseInt(comboSelect.value)
            },
            total: parseFloat(totalPriceElement.textContent.replace('Total: ', '').replace(' kr.', '')),
            timestamp: new Date().toISOString()
        };
        
        saveBooking(booking);
        localStorage.setItem('cinemaState', JSON.stringify(cinemaState));
        
        selectedSeats = [];
        renderCinemaHall();
        updateSelectedSeatsInfo();
        
        alert(`Bestilling bekræftet for ${booking.hallName}! Tak, ${name}. Dine sæder er nu reserveret.`);
    }
    
    // Save booking to localStorage
    function saveBooking(booking) {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }
    
    // Handle hall selection change
    function handleHallChange() {
        currentHallId = hallSelect.value;
        selectedSeats = [];
        updateHallInfo();
        renderCinemaHall();
        updateSelectedSeatsInfo();
    }
    
    // Handle ticket count change
    function handleTicketCountChange(newCount) {
        ticketCount = newCount;
        ticketCountInput.value = ticketCount;
        
        // Update extras dropdowns
        updateExtrasOptions();
        
        // Deselect extra seats if needed
        while (selectedSeats.length > ticketCount) {
            const seatToDeselect = selectedSeats.pop();
            const seatElement = document.querySelector(`.seat[data-row="${seatToDeselect.row}"][data-col="${seatToDeselect.col}"]`);
            if (seatElement) {
                seatElement.classList.remove('selected');
                seatElement.classList.add('free');
            }
        }
        
        updateSelectedSeatsInfo();
        calculateTotal();
    }
    
    // Event listeners
    decreaseTicketsBtn.addEventListener('click', () => {
        if (ticketCount > 1) {
            handleTicketCountChange(ticketCount - 1);
        }
    });
    
    increaseTicketsBtn.addEventListener('click', () => {
        if (ticketCount < 10) {
            handleTicketCountChange(ticketCount + 1);
        }
    });
    
    ticketCountInput.addEventListener('change', () => {
        const newCount = parseInt(ticketCountInput.value);
        if (!isNaN(newCount) && newCount >= 1 && newCount <= 10) {
            handleTicketCountChange(newCount);
        } else {
            ticketCountInput.value = ticketCount;
        }
    });
    
    // Add event listeners for extras
    document.querySelectorAll('.extra-select').forEach(select => {
        select.addEventListener('change', calculateTotal);
    });
    
    checkoutButton.addEventListener('click', handleCheckout);
    
    hallSelect.addEventListener('change', handleHallChange);
    
    // Initial setup
    cinemaState = initializeCinemaHalls();
    populateHallSelection();
    updateHallInfo();
    updateExtrasOptions();
    renderCinemaHall();
    updateSelectedSeatsInfo();
    calculateTotal();
});