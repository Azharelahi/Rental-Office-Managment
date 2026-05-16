import './index.css'
import { openEditBookingModal } from './components/EditBookingModal.js';


import { Sidebar } from './components/Sidebar.js'

import {
  NewBooking,
  initNewBooking
} from './pages/NewBooking.js'

import { ScheduledBookings } from './pages/ScheduledBookings.js'
import { Statistics } from './pages/Statistics.js'

const app = document.getElementById('app')

app.innerHTML = `
  <div class="layout">

    <div class="sidebar">
      ${Sidebar()}
    </div>

    <div class="content" id="content">
      ${NewBooking()}
    </div>

  </div>
`
// IMPORTANT
initNewBooking()
let currentFilter = "all";

document.addEventListener("change", async (e) => {
  if (e.target.id === "filterSelect") {
    currentFilter = e.target.value;

    const html = await ScheduledBookings(currentFilter);

    document.getElementById("content").innerHTML = html;
  }
});
const content = document.getElementById('content')
window.loadPage = async (page) => {

  if (page === 'new-booking') {
    content.innerHTML = NewBooking()
    initNewBooking()
  }

 if (page === 'scheduled-bookings') {
  const html = await ScheduledBookings(currentFilter);
  content.innerHTML = html;
}

  if (page === 'statistics') {
    content.innerHTML = Statistics()
  }

  updateActiveButton(page)
}
document.addEventListener("click", async (e) => {

  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  if (!action) return;

  // ---------------- DELETE ----------------
  if (action === "delete") {
    console.log("DELETE REQUEST:", id);

    await window.api.bookingDelete({
      booking_id: id
    });

    // refresh page
    const html = await ScheduledBookings(currentFilter);
    document.getElementById("content").innerHTML = html;
  }

  // ---------------- EDIT ----------------
 if (action === "edit") {

  const booking = await window.api.bookingGet({
    booking_id: id
  });

  openEditBookingModal(booking, async (updated) => {

    await window.api.bookingUpdate(updated);

    const html = await ScheduledBookings(currentFilter);
    document.getElementById("content").innerHTML = html;
  });
}

});
window.openEditBooking = function (b) {
  const modal = document.createElement("div");

  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-box">

      <h2>Edit Booking</h2>

      <input id="edit_name" value="${b.booked_by}" placeholder="Client Name" />

      <input id="edit_car" value="${b.carName}" placeholder="Car ID (we will upgrade later)" />

      <input id="edit_provider" value="${b.car_provided_by}" placeholder="Provider" />

      <input id="edit_start" type="date" value="${b.start_date}" />

      <input id="edit_end" type="date" value="${b.end_date}" />

      <textarea id="edit_notes">${b.notes || ""}</textarea>

      <button id="saveEdit">💾 Save</button>
      <button id="closeEdit">❌ Cancel</button>

    </div>
  `;

  document.body.appendChild(modal);

  // CLOSE
  modal.querySelector("#closeEdit").onclick = () => {
    modal.remove();
  };

  // SAVE
  modal.querySelector("#saveEdit").onclick = async () => {

    const updated = {
      booking_id: b.booking_id,
      booked_by: document.getElementById("edit_name").value,
      car_id: document.getElementById("edit_car").value,
      car_provided_by: document.getElementById("edit_provider").value,
      start_date: document.getElementById("edit_start").value,
      end_date: document.getElementById("edit_end").value,
      notes: document.getElementById("edit_notes").value
    };

    await window.api.bookingUpdate(updated);

    modal.remove();

    // refresh page
    const html = await ScheduledBookings(currentFilter);
    document.getElementById("content").innerHTML = html;
  };
};
function updateActiveButton(activePage) {

  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.classList.remove('active')
  })

  document
    .querySelector(`[data-page="${activePage}"]`)
    .classList.add('active')
}
document.addEventListener('change', (e) => {

  if (e.target.id === 'enable-time') {

    const timeContainer = document.getElementById('time-container')

    if (e.target.checked) {
      timeContainer.style.display = 'block'
    } else {
      timeContainer.style.display = 'none'
    }

  }

})