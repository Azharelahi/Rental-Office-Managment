export function Sidebar() {

  return `
  
    <div class="sidebar-container">

      <h2>Office Management</h2>

      <button 
        class="menu-btn active"
        data-page="new-booking"
        onclick="loadPage('new-booking')"
      >
        New Booking
      </button>

      <button 
        class="menu-btn"
        data-page="scheduled-bookings"
        onclick="loadPage('scheduled-bookings')"
      >
        Scheduled Bookings
      </button>

      <button 
        class="menu-btn"
        data-page="statistics"
        onclick="loadPage('statistics')"
      >
        Statistics
      </button>

    </div>

  `
}