const seats = [
  "A1", "A2", "A3", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D1", "D2", "D3", "D4",
  "E1", "E2", "E3", "E4",
  "F1", "F2", "F3", "F4",
  "G1", "G2", "G3", "G4"
];

const seatContainer = document.querySelector(".grid.grid-cols-5");
const selectedSeats = [];
const maxSeats = seats.length;

const selectedCountElement = document.getElementById("selected-count");
const availableCountElement = document.getElementById("available-count");
const selectedSeatsTable = document.getElementById("selected-seats-table");
const totalPriceTable = document.getElementById("total-price-table");
const seatPrice = 550;

function updateSeatInfo() {
  selectedCountElement.innerText = selectedSeats.length;
  availableCountElement.innerText = maxSeats - selectedSeats.length;
  selectedSeatsTable.innerText = selectedSeats.length ? selectedSeats.join(", ") : "None";
  totalPriceTable.innerText = `৳${selectedSeats.length * seatPrice}`;
}

// Generate seats
seats.forEach((seat) => {
  const btn = document.createElement("button");
  btn.innerText = seat;
  btn.classList.add("btn", "btn-sm", "seat", "bg-white");
  btn.addEventListener("click", () => {
    if (!selectedSeats.includes(seat)) {
      selectedSeats.push(seat);
      btn.classList.remove("bg-white");
      btn.classList.add("bg-green-400", "text-white");
    } else {
      const index = selectedSeats.indexOf(seat);
      selectedSeats.splice(index, 1);
      btn.classList.remove("bg-green-400", "text-white");
      btn.classList.add("bg-white");
    }
    updateSeatInfo();
  });
  seatContainer.appendChild(btn);
});

// Enable Next button when name & phone entered
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const nextBtn = document.getElementById("next-button");

[nameInput, phoneInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (nameInput.value.trim() && phoneInput.value.trim()) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  });
});
