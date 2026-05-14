async function loadCars() {
  console.log("Loading cars from database...");

  const select = document.getElementById("car-select");
  if (!select) return;

  const cars = await window.api.getCars();

  if (!cars || cars.length === 0) {
    console.log("No cars found");
    return;
  }

  // clear old dynamic options
  select.innerHTML = `
    <option value="">
      Select Car From Database
    </option>
  `;

  cars.forEach(car => {
    const option = document.createElement("option");

    option.value = car.car_name_and_no;
    option.textContent = car.car_name_and_no;

    select.appendChild(option);
  });
}
function attachFormHandler() {
  const form = document.getElementById("booking-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      clientName: document.getElementById("client-name").value,
      carName: document.getElementById("car-select").value,
      manualCar: document.getElementById("manual-car").value,
      provider: document.getElementById("provider").value,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("end-date").value,
      notes: document.getElementById("notes").value
    };

    console.log("📦 FORM DATA:", data);

    // 🔥 THIS IS THE MISSING PART
    window.api.createBooking(data);
  });
}
export function initNewBooking() {
  loadCars()
  attachFormHandler();
}
// loadCars()
export function NewBooking() {

  return `
  
    <div
      style="
        padding: 40px;
        height: 100%;
        overflow-y: auto;
        background: #f4f7fb;
      "
    >

      <div
        style="
          max-width: 750px;
          margin: auto;
          background: white;
          border-radius: 20px;
          padding: 35px;
          box-shadow: 0 10px 35px rgba(0,0,0,0.08);
        "
      >

        <h1
          style="
            margin-bottom: 10px;
            font-size: 34px;
            color: #111827;
          "
        >
          🚗 New Booking Form
        </h1>

        <p
          style="
            color: #6b7280;
            margin-bottom: 35px;
            font-size: 15px;
          "
        >
          Add a new rental booking for the office.
        </p>


        <form
        id="booking-form"
          class="booking-form"
          style="
            display: flex;
            flex-direction: column;
            gap: 25px;
          "
        >

          <!-- CLIENT NAME -->

          <div>

            <label
              style="
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                color: #374151;
              "
            >
              Client Name (Optional)
            </label>

            <input 
              type="text"
              id="client-name"
              placeholder="Enter client name"
              style="
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                font-size: 15px;
                outline: none;
              "
            />

          </div>


          <!-- CAR SELECTION -->

          <div>

            <label
              style="
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                color: #374151;
              "
            >
              Car
            </label>

            <select
              id="car-select"
              style="
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                font-size: 15px;
                margin-bottom: 15px;
                background: white;
              "
            >

              <option value="">
                Select Car From Database
              </option>

            </select>

            <div
              style="
                text-align: center;
                margin: 10px 0;
                color: #9ca3af;
                font-size: 14px;
              "
            >
              OR
            </div>

            <input 
              type="text"
              id="manual-car"
              placeholder="Enter car manually (optional for now)"
              style="
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                font-size: 15px;
                outline: none;
              "
            />

          </div>


          <!-- CAR PROVIDED BY -->

          <div>

            <label
              style="
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                color: #374151;
              "
            >
              Car Provided By
            </label>

            <select
              required
              id="provider"
              style="
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                font-size: 15px;
                background: white;
              "
            >

              <option value="">
                Select Provider
              </option>

              <option value="Assad Khan">
                Assad Khan
              </option>

              <option value="Muhammad Yasir">
                Muhammad Yasir
              </option>

            </select>

          </div>


          <!-- DATES -->

          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            "
          >

            <!-- START DATE -->

            <div>

              <label
                style="
                  display: block;
                  margin-bottom: 10px;
                  font-weight: 600;
                  color: #374151;
                "
              >
                Start Date
              </label>

              <input 
                type="date"
                id="start-date"
                style="
                  width: 100%;
                  padding: 14px;
                  border-radius: 12px;
                  border: 1px solid #d1d5db;
                  font-size: 15px;
                "
              />

            </div>


            <!-- END DATE -->

            <div>

              <label
                style="
                  display: block;
                  margin-bottom: 10px;
                  font-weight: 600;
                  color: #374151;
                "
              >
                End Date
              </label>

              <input 
                type="date"
                id="end-date"
                style="
                  width: 100%;
                  padding: 14px;
                  border-radius: 12px;
                  border: 1px solid #d1d5db;
                  font-size: 15px;
                "
              />

            </div>

          </div>


          <!-- NOTES -->

          <div>

            <label
              style="
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                color: #374151;
              "
            >
              Notes (Optional)
            </label>

            <textarea
            id="notes"
              placeholder="Any special instructions..."
              rows="4"
              style="
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                font-size: 15px;
                outline: none;
                resize: none;
              "
            ></textarea>

          </div>


          <!-- BUTTON -->

          <button
            type="submit"
            style="
              background: linear-gradient(135deg,#111827,#1f2937);
              color: white;
              border: none;
              padding: 16px;
              border-radius: 14px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: 0.3s;
              margin-top: 10px;
            "
          >
            Save Booking
          </button>

        </form>

      </div>

    </div>

  `
}