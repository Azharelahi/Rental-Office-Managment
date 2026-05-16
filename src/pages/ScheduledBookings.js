export async function ScheduledBookings(filter = "all") {
  const bookings = await window.api.getBookings();

  console.log("📦 BOOKINGS:", bookings);

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
    <div class="page">

      <div class="topbar">

        <h1>📅 Scheduled Bookings</h1>

        <select id="filterSelect" class="filter">
          <option value="all" ${filter === "all" ? "selected" : ""}>All</option>
          <option value="Assad Khan" ${filter === "Assad Khan" ? "selected" : ""}>Assad Khan</option>
          <option value="Muhammad Yasir" ${filter === "Muhammad Yasir" ? "selected" : ""}>Muhammad Yasir</option>
        </select>

      </div>

      <div class="grid">
        ${sorted.length > 0 ? sorted.map(renderCard).join("") : emptyState()}
      </div>

    </div>
  `;
}

// ---------------- CARD UI ----------------
function renderCard(b) {
  return `
    <div class="card">

      <div class="card-top">
        <h2>${b.booked_by}</h2>
        <span class="badge">#${b.booking_id}</span>
      </div>

      <div class="info">
        <div>
          <p class="label">Car</p>
          <p class="value">${b.car_id}</p>
        </div>

        <div>
          <p class="label">Provider</p>
          <p class="value">${b.car_provided_by}</p>
        </div>
      </div>

      <div class="dates">
        📅 ${b.start_date} → ${b.end_date}
      </div>

      <div class="notes">
        📝 ${b.notes || "No notes"}
      </div>

    </div>
  `;
}

// ---------------- EMPTY STATE ----------------
function emptyState() {
  return `
    <div class="empty">
      <p>🚫 No bookings found</p>
    </div>
  `;
}