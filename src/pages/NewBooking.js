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


          <!-- CAR TYPE -->

          <div>

            <label
              style="
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                color: #374151;
              "
            >
              Car Type
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

              <option value="Corolla">
                Corolla
              </option>

              <option value="Civic">
                Civic
              </option>

              <option value="BRV">
                BRV
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
              placeholder="Enter car manually"
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


          <!-- PROVIDED BY -->

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
                Select Vendor
              </option>

              <option value="Assad Khan">
                Assad Khan
              </option>

              <option value="Yasir Khan">
                Yasir Khan
              </option>

            </select>

          </div>


          <!-- DATE SECTION -->

          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            "
          >

            <!-- FROM DATE -->

            <div>

              <label
                style="
                  display: block;
                  margin-bottom: 10px;
                  font-weight: 600;
                  color: #374151;
                "
              >
                From Date
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


          <!-- TIME SWITCH -->

          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #f9fafb;
              padding: 18px;
              border-radius: 14px;
            "
          >

            <div>

              <h3
                style="
                  margin: 0;
                  font-size: 16px;
                  color: #111827;
                "
              >
                Store Time
              </h3>

              <p
                style="
                  margin-top: 5px;
                  color: #6b7280;
                  font-size: 13px;
                "
              >
                Enable this if pickup timing matters.
              </p>

            </div>

            <input
              type="checkbox"
              id="enable-time"
              style="
                width: 22px;
                height: 22px;
                cursor: pointer;
              "
            />

          </div>


          <!-- TIME INPUT -->

          <div
            id="time-container"
            style="
              display: none;
            "
          >

            <label
              style="
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                color: #374151;
              "
            >
              Select Time
            </label>

            <input 
              type="time"
              style="
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                font-size: 15px;
              "
            />

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