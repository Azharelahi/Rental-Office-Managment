export async function ScheduledBookings(filter = "all") {
  const bookings = await window.api.getBookings();

  let filtered = bookings;

  if (filter !== "all") {
    filtered = bookings.filter(
      (b) => b.car_provided_by === filter
    );
  }

  const sorted = filtered.sort(
    (a, b) => new Date(a.start_date) - new Date(b.start_date)
  );

  return `
    <div style="
      min-height:100vh;
      padding:32px;
      font-family: ui-sans-serif, system-ui, -apple-system;
      color:#e5e7eb;

      background:
        radial-gradient(circle at top left, #0f172a, transparent 40%),
        radial-gradient(circle at bottom right, #020617, transparent 40%),
        #020617;
    ">

      <!-- HEADER -->
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:28px;
      ">

        <div>
          <h1 style="
            margin:0;
            font-size:22px;
            letter-spacing:0.5px;
          ">
            📅 Scheduled Bookings
          </h1>

          <p style="
            margin:4px 0 0;
            font-size:12px;
            opacity:0.6;
          ">
            Manage all active rental bookings
          </p>
        </div>

        <!-- FILTER -->
        <select id="filterSelect" style="
          padding:10px 14px;
          border-radius:999px;

          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.12);

          color:#e5e7eb;
          outline:none;

          backdrop-filter: blur(14px);

          cursor:pointer;
          transition:0.2s ease;
        ">
          <option value="all" ${filter === "all" ? "selected" : ""}>All Providers</option>
          <option value="Assad Khan" ${filter === "Assad Khan" ? "selected" : ""}>Assad Khan</option>
          <option value="Muhammad Yasir" ${filter === "Muhammad Yasir" ? "selected" : ""}>Muhammad Yasir</option>
        </select>

      </div>

      <!-- GRID -->
      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));
        gap:18px;
      ">
        ${sorted.length ? sorted.map(renderCard).join("") : emptyState()}
      </div>

    </div>
  `;
}
// ---------------- CARD UI ----------------
function renderCard(b) {
  return `
    <div style="
      position:relative;
      padding:18px;
      border-radius:18px;

      background:rgba(255,255,255,0.05);
      border:1px solid rgba(255,255,255,0.08);

      backdrop-filter: blur(18px);

      transition: all 0.25s ease;

      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
    "
    onmouseover="this.style.transform='translateY(-6px)'; this.style.borderColor='rgba(255,255,255,0.2)'"
    onmouseout="this.style.transform='translateY(0px)'; this.style.borderColor='rgba(255,255,255,0.08)'"
    >

      <!-- TOP -->
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">

        <div>
          <div style="
            font-size:15px;
            font-weight:600;
          ">
            ${b.booked_by}
          </div>

          <div style="
            font-size:11px;
            opacity:0.5;
          ">
            Booking ID #${b.booking_id}
          </div>
        </div>

        <!-- ACTIONS -->
        <div style="display:flex; gap:8px;">
          <button data-action="edit" data-id="${b.booking_id}" style="
            padding:6px 10px;
            border-radius:10px;

            background:rgba(59,130,246,0.15);
            border:1px solid rgba(59,130,246,0.25);

            color:#93c5fd;
            cursor:pointer;
          ">✏️</button>

          <button data-action="delete" data-id="${b.booking_id}" style="
            padding:6px 10px;
            border-radius:10px;

            background:rgba(239,68,68,0.15);
            border:1px solid rgba(239,68,68,0.25);

            color:#fca5a5;
            cursor:pointer;
          ">🗑️</button>
        </div>

      </div>

      <!-- INFO -->
      <div style="margin-top:14px; display:flex; flex-direction:column; gap:10px;">

        <div>
          <div style="font-size:11px; opacity:0.5;">Car</div>
          <div style="font-weight:600;">${b.carName}</div>
        </div>

        <div>
          <div style="font-size:11px; opacity:0.5;">Provider</div>
          <div style="font-weight:600;">${b.car_provided_by}</div>
        </div>

      </div>

      <!-- DATE -->
      <div style="
        margin-top:14px;
        padding:10px 12px;
        border-radius:12px;

        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.06);
      ">
        📅 ${b.start_date} → ${b.end_date}
      </div>

      <!-- NOTES -->
      <div style="
        margin-top:12px;
        font-size:13px;
        opacity:0.75;
        line-height:1.4;
      ">
        📝 ${b.notes || "No notes"}
      </div>

    </div>
  `;
}
// ---------------- EMPTY STATE ----------------
function emptyState() {
  return `
    <div style="
      text-align:center;
      padding:60px;
      opacity:0.6;
      font-size:14px;
    ">
      No bookings found
    </div>
  `;
}