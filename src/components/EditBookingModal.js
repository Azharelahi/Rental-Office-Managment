export function openEditBookingModal(b, onSave) {

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-box">

      <h2>Edit Booking</h2>

      <input id="edit_name" value="${b.booked_by}" placeholder="Client Name" />

      <!-- CAR DROPDOWN -->
      <select id="edit_car">
        <option>Loading cars...</option>
      </select>

      <!-- PROVIDER DROPDOWN -->
      <select id="edit_provider">
        <option value="Assad Khan" ${b.car_provided_by === "Assad Khan" ? "selected" : ""}>
          Assad Khan
        </option>
        <option value="Muhammad Yasir" ${b.car_provided_by === "Muhammad Yasir" ? "selected" : ""}>
          Muhammad Yasir
        </option>
      </select>

      <input id="edit_start" type="date" value="${b.start_date}" />

      <input id="edit_end" type="date" value="${b.end_date}" />

      <textarea id="edit_notes">${b.notes || ""}</textarea>

      <div class="modal-actions">
        <button id="saveEdit">💾 Save</button>
        <button id="closeEdit">❌ Cancel</button>
      </div>

    </div>
  `;

  document.body.appendChild(modal);

  const carSelect = modal.querySelector("#edit_car");

  // ---------------- CLOSE ----------------
  modal.querySelector("#closeEdit").onclick = () => {
    modal.remove();
  };

  // ---------------- LOAD CARS FROM DB ----------------
  async function loadCars() {
    const cars = await window.api.getCars();

    if (!cars || cars.length === 0) {
      carSelect.innerHTML = `<option>No cars found</option>`;
      return;
    }

    carSelect.innerHTML = `<option value="">Select Car</option>`;

    cars.forEach(car => {
      const option = document.createElement("option");

      option.value = car.car_name_and_no;
      option.textContent = car.car_name_and_no;

      // preselect current value
      if (car.car_name_and_no === b.carName || car.car_name_and_no === b.car_id) {
        option.selected = true;
      }

      carSelect.appendChild(option);
    });
  }

  loadCars();

  // ---------------- SAVE ----------------
  modal.querySelector("#saveEdit").onclick = async () => {

    const updated = {
      booking_id: b.booking_id,
      booked_by: modal.querySelector("#edit_name").value,
      car_name_and_no: modal.querySelector("#edit_car").value,
      car_provided_by: modal.querySelector("#edit_provider").value,
      start_date: modal.querySelector("#edit_start").value,
      end_date: modal.querySelector("#edit_end").value,
      notes: modal.querySelector("#edit_notes").value
    };

    await onSave(updated);

    modal.remove();
  };
}