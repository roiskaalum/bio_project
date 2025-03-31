// Cinema data
const cinemaData = {
    "cinema": [
        {
            "cinemahall": "1",
            "timeslots": [
                {
                    "monday": ["16:30", "19:00", "20:00"],
                    "tuesday": ["16:30", "19:00", "20:00"],
                    "wednesday": ["16:30", "19:00", "20:00"],
                    "thursday": ["16:30", "19:00", "20:00"],
                    "friday": ["16:30", "19:00", "20:00"],
                    "saturday": ["16:30", "19:00", "20:00"],
                    "sunday": ["16:30", "19:00", "20:00"]
                }
            ]
        },
        {
            "cinemahall": "2",
            "timeslots": [
                {
                    "monday": ["16:30", "19:00", "20:00"],
                    "tuesday": ["16:30", "19:00", "20:00"],
                    "wednesday": ["16:30", "19:00", "20:00"],
                    "thursday": ["16:30", "19:00", "20:00"],
                    "friday": ["16:30", "19:00", "20:00"],
                    "saturday": ["16:30", "19:00", "20:00"],
                    "sunday": ["16:30", "19:00", "20:00"]
                }
            ]
        }
    ]
};

// DOM elements
const hallSelect = document.getElementById('hall-select');
const weekRange = document.getElementById('week-range');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekDaysContainer = document.querySelector('.week-days');
const timeslotContainer = document.querySelector('.timeslot-container');

const weekRangeMobile = document.getElementById('week-range-mobile');
const prevWeekBtnMobile = document.getElementById('prev-week-mobile');
const nextWeekBtnMobile = document.getElementById('next-week-mobile');
const weekDaysContainerMobile = document.querySelectorAll('.week-days')[1];
const timeslotContainerMobile = document.querySelectorAll('.timeslot-container')[1];

// Current week tracking
let currentWeekStart = getStartOfWeek(new Date());

// Initialize the app
function init() {
    populateHallSelect();
    renderWeekCalendar();
    setupEventListeners();
    
    // Set a default movie title (you can modify this or get it from URL params)
    document.getElementById('movie-title').textContent = "Avengers: Endgame";
}

// Populate cinema hall dropdown
function populateHallSelect() {
    cinemaData.cinema.forEach(hall => {
        const option = document.createElement('option');
        option.value = hall.cinemahall;
        option.textContent = `Hall ${hall.cinemahall}`;
        hallSelect.appendChild(option);
    });
}

// Render the weekly calendar
function renderWeekCalendar() {
    // Clear previous content
    weekDaysContainer.innerHTML = '';
    weekDaysContainerMobile.innerHTML = '';
    timeslotContainer.innerHTML = '';
    timeslotContainerMobile.innerHTML = '';
    
    // Update week range display
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekRange.textContent = `Week of ${formatDate(currentWeekStart)} to ${formatDate(weekEnd)}`;
    weekRangeMobile.textContent = `Week of ${formatDate(currentWeekStart)} to ${formatDate(weekEnd)}`;
    
    // Get selected hall
    const selectedHall = hallSelect.value;
    const hallData = cinemaData.cinema.find(hall => hall.cinemahall === selectedHall);
    
    // Create day headers and columns
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(currentWeekStart);
        dayDate.setDate(dayDate.getDate() + i);
        
        // Create day header
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        if (dayDate.toDateString() === today.toDateString()) {
            dayHeader.classList.add('current-day');
        }
        
        dayHeader.innerHTML = `
            <div>${dayDate.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div>${dayDate.getDate()}</div>
        `;
        weekDaysContainer.appendChild(dayHeader.cloneNode(true));
        weekDaysContainerMobile.appendChild(dayHeader.cloneNode(true));
        
        // Create day column for timeslots
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        dayColumn.dataset.day = daysOfWeek[i];
        
        // Add timeslots for this day
        if (hallData && hallData.timeslots[0][daysOfWeek[i]]) {
            hallData.timeslots[0][daysOfWeek[i]].forEach(time => {
                const timeslot = document.createElement('div');
                timeslot.className = 'timeslot';
                timeslot.textContent = time;
                timeslot.dataset.time = time;
                timeslot.dataset.day = daysOfWeek[i];
                timeslot.dataset.date = formatDate(dayDate);
                // timeslot.addEventListener('click', handleTimeSlotClick);
                dayColumn.appendChild(timeslot);
            });
        }
        
        timeslotContainer.appendChild(dayColumn.cloneNode(true));
        timeslotContainerMobile.appendChild(dayColumn.cloneNode(true));
    }
}

function handleTimeSlotClick(event) {
    document.querySelectorAll('.timeslot.selected').forEach(item => {
        item.classList.remove('selected');
    });

    event.currentTarget.classList.add('selected');

    const time = event.currentTarget.dataset.time;
    const day = event.currentTarget.dataset.day;
    const date = event.currentTarget.dataset.date;
    const hall = hallSelect.value;
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");

    console.log(`Selected: ${title} in Hall ${hall} on ${date} at ${time}`);
    
    window.location.href = `chooseseat.html?title=${encodeURIComponent(title)}&hall=${encodeURIComponent(hall)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;
}

// Helper function to get start of week (Sunday)
function getStartOfWeek(date) {
    const result = new Date(date);
    result.setDate(result.getDate() - result.getDay()); // Adjust to previous Sunday
    result.setHours(0, 0, 0, 0);
    return result;
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Set up event listeners
function setupEventListeners() {
    hallSelect.addEventListener('change', renderWeekCalendar);
    
    prevWeekBtn.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderWeekCalendar();
    });
    prevWeekBtnMobile.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderWeekCalendar();
    });
    
    nextWeekBtn.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderWeekCalendar();
    });
    nextWeekBtnMobile.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderWeekCalendar();
    });

    timeslotContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("timeslot")) {
            handleTimeSlotClick(event);
        }
    });
    
    timeslotContainerMobile.addEventListener("click", function (event) {
        if (event.target.classList.contains("timeslot")) {
            handleTimeSlotClick(event);
        }
    });
}

// Initialize the application
init();
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('title'));
});