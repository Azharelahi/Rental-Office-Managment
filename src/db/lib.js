import AppDatabase from "./database";

let db = new AppDatabase();
// db.addCar(
//     {
//         car_name_and_no: "Toyota Corolla 427",
//         daily_rate: 8000,
//         commission_per_day: 1000
//     }
// )
db.addBooking({
    car_id: 1,
    customer_name: "Azhar Elahi",
    start_date: "2024-07-01",

    end_date: "2024-07-05",
    number_of_days: 5,
    notes: "Customer requested a child seat.",
    total_rental: 40000,
    car_provided_by: "Assad Khan",
    daily_rate: 8000,
    commission_per_day: 1000
})
    