async function loadCars() {
console.log("Loading cars from database...")
  const select = document.getElementById('car-select')

  if (!select) return   // safety check

  const cars = await window.api.getCars()

  cars.forEach(car => {

    const option = document.createElement('option')

    option.value = car.id
    option.textContent = car.car_name_and_no

    select.appendChild(option)

  })
}
export function initNewBooking() {
  requestAnimationFrame(() => {
    loadCars()
  })
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