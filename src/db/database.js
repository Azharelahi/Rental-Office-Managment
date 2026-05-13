import { app } from 'electron'
import path from 'node:path'
import Database from 'better-sqlite3'

class AppDatabase {

  constructor() {

    const dbPath = path.join(
      app.getPath('userData'),
      'rentalOffice.db'
    )
    this.db = new Database(dbPath)

    this.db.pragma('journal_mode = WAL')

    this.setUpDatabase()
  }

  setUpDatabase() {

    /* =========================
       TABLE 1 : CARS
    ========================== */

    this.db.exec(`

      CREATE TABLE IF NOT EXISTS cars (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        car_name_and_no TEXT NOT NULL,

       

        daily_rate REAL NOT NULL,

        commission_per_day REAL NOT NULL,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

      )

    `)


    /* =========================
       TABLE 2 : BOOKINGS
    ========================== */

   this.db.exec(`

  CREATE TABLE IF NOT EXISTS bookings (

    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,

    car_id INTEGER NOT NULL,
    booked_by TEXT NOT NULL,

    car_provided_by TEXT NOT NULL,

    start_date TEXT NOT NULL,

    end_date TEXT NOT NULL,

    number_of_days INTEGER NOT NULL,

    daily_rate REAL NOT NULL,

    total_rental REAL NOT NULL,

    commission_due REAL NOT NULL,

    notes TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (car_id) REFERENCES cars(id)

  )

`)

  }


  /* =========================
     INSERT CAR
  ========================== */

  addCar(data) {

    const statement = this.db.prepare(`

      INSERT INTO cars (

        car_name_and_no,
        daily_rate,
        commission_per_day

      )

      VALUES (?, ?, ?)

    `)

    return statement.run(

      data.car_name_and_no,
      data.daily_rate,
      data.commission_per_day

    )
  }
//Get Cars
getAllCars() {

  const statement = this.db.prepare(`
    SELECT *
    FROM cars
    ORDER BY id DESC
  `)

  return statement.all()
}
  /* =========================
     INSERT BOOKING
  ========================== */

  addBooking(data) {

    /* =========================
       GET CAR DATA
    ========================== */

    const car = this.db.prepare(`

      SELECT *
      FROM cars
      WHERE id = ?

    `).get(data.car_id)


    if (!car) {
      throw new Error('Car not found')
    }


    /* =========================
       CALCULATE NUMBER OF DAYS
    ========================== */

    const start = new Date(data.start_date)

    const end = new Date(data.end_date)

    const differenceInMs =
      end.getTime() - start.getTime()

    const number_of_days =
      Math.ceil(
        differenceInMs /
        (1000 * 60 * 60 * 24)
      )


    /* =========================
       TOTAL RENTAL
    ========================== */

    const total_rental =
      number_of_days *
      car.daily_rate


    /* =========================
       COMMISSION LOGIC
    ========================== */

    let commission_due = 0

    if (
      data.car_provided_by === 'Yasir Khan'
    ) {

      commission_due =
        number_of_days *
        car.commission_per_day
    }


    /* =========================
       INSERT BOOKING
    ========================== */

  const statement = this.db.prepare(`

  INSERT INTO bookings (

    car_id,
    car_provided_by,
client_name,
    start_date,

    end_date,

    number_of_days,

    daily_rate,

    total_rental,

    commission_due,

    notes

  )

  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

`)

return statement.run(

  data.car_id,

  data.car_provided_by,
data.customer_name,
  data.start_date,

  data.end_date,

  number_of_days,

  car.daily_rate,

  total_rental,

  commission_due,

  data.notes

)
  }


  /* =========================
     GET ALL BOOKINGS
  ========================== */



}

export default AppDatabase