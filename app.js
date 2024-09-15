const seats = document.querySelectorAll('.seat');
const remainingSeatsSpan = document.getElementById('remaining-seats');
const selectedSeatsSpan = document.getElementById('selected-seats');
const selectedSeatsTable = document.getElementById('selected-seats-table');
const totalPriceTable = document.getElementById('total-price-table');
const nextButton = document.getElementById('next-button');
const formInputs = document.querySelectorAll('#user-form input');

const seatPrice = 550;
let remainingSeats = 28;
let selectedSeats = [];
let totalCost = 0;

seats.forEach(seat => {
  seat.addEventListener('click', () => {
    const seatNumber = seat.textContent;

    if (!selectedSeats.includes(seatNumber)) {
      selectedSeats.push(seatNumber);
      seat.classList.add('bg-green-500'); // Highlight selected seat
      totalCost += seatPrice;
      remainingSeats--;
    } else {
      selectedSeats = selectedSeats.filter(s => s !== seatNumber);
      seat.classList.remove('bg-green-500');
      totalCost -= seatPrice;
      remainingSeats++;
    }
console.log(selectedSeats);
    remainingSeatsSpan.textContent = `Available: ${remainingSeats}`;
    selectedSeatsTable.innerHTML = selectedSeats.length ? `<tr><td>${selectedSeats.join('</td></tr><tr><td>')}</td></tr>` : '<tr><td>None</td></tr>';
    
    selectedSeatsTable.textContent = selectedSeats.join(', ') || 'None';
    totalPriceTable.textContent = `$${totalCost}`;

    toggleNextButton();
  });
});

function toggleNextButton() {
  const allFieldsFilled = Array.from(formInputs).every(input => input.value.trim() !== '');
  nextButton.disabled = selectedSeats.length === 0 || !allFieldsFilled;
}

formInputs.forEach(input => {
  input.addEventListener('input', toggleNextButton);
});

nextButton.addEventListener('click', () => {
  Swal.fire({
    title: 'Booking Confirmed',
    text: `Seats: ${selectedSeats.join(', ')}\nClass: Economy\nTotal Cost: $${totalCost}\nName: ${document.getElementById('name').value}\nPhone: ${document.getElementById('phone').value}\nEmail: ${document.getElementById('email').value}`,
    icon: 'success',
    confirmButtonText: 'OK'
  });
});