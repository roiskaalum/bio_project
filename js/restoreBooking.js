document.addEventListener("DOMContentLoaded", () => {
    const bookingData = JSON.parse(localStorage.getItem('unfinishedBooking'));

    if (bookingData) {
        const resume = confirm(`You have an unfinished booking for ${bookingData.title} on ${bookingData.date} at ${bookingData.time}. Do you want to continue?`);
        
        if (resume) {
            restoreBooking();
        } else {
            localStorage.removeItem('unfinishedBooking'); // Clear it if they don't want to continue
        }
    }
});

function restoreBooking() {
    const bookingData = JSON.parse(localStorage.getItem('unfinishedBooking'));
    if (!bookingData) return;

    // Convert the booking data back into URL parameters
    const params = new URLSearchParams({
        title: bookingData.title,
        hall: bookingData.hall,
        date: bookingData.date,
        day: bookingData.day,
        time: bookingData.time
    });

    // Redirect to seat selection page
    window.location.href = `chooseseat.html?${params.toString()}`;
}
