import AppDatabase from "./database";

let db = new AppDatabase();

export function addNewBooking (bookingData) {
    const start = new Date(bookingData.startDate);
const end = new Date(bookingData.endDate);

const diffInMs = end - start;

const totalDays = Math.ceil(
  diffInMs / (1000 * 60 * 60 * 24)
);
db.addBooking({
    carName: bookingData.carName,
    customer_name: bookingData.clientName,
    start_date: bookingData.startDate,   

    end_date: bookingData.endDate,
    number_of_days: totalDays,
    notes: bookingData.notes,
    total_rental: 40000,
    car_provided_by: bookingData.provider,
    daily_rate: 8000,
    commission_per_day: 1000
})
return { id: 1 };}
    