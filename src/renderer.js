import './index.css'


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