import AppDatabase from "./database";

let db = new AppDatabase();

export function updateBooking(data){
    console.log("UPDATE BOOKING", data);
    return db.updateBookingQuery(data);
}
export function deleteBooking(id){
console.log("DELETE BOOKING ID:", id)}
export function getBookingById(id){
console.log("GET BOOKING BY ID:", db.getAllBookingsQuery(id))
return db.getBookingByIdQuery(id)
}
export function getAllBookings(){return db.getAllBookingsQuery()}
export function getBookingByName(name){}
export function getBookingByCarProvider(carProvider){}
export function getBookingbySpacificCar(CarName){}
export function getBookingByDateRange(startDate, endDate){}

export function addNewBooking (bookingData) {
    const start = new Date(bookingData.startDate);
const end = new Date(bookingData.endDate);

const diffInMs = end - start;

const totalDays = Math.ceil(
  diffInMs / (1000 * 60 * 60 * 24)
);
db.addBookingquery({
    carName: bookingData.carName,
    customer_name: bookingData.clientName,
    start_date: bookingData.startDate,   

    end_date: bookingData.endDate,
    number_of_days: totalDays,
    notes: bookingData.notes,
    car_provided_by: bookingData.provider,
})
return { id: 1 };}
    