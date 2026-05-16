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

  /* =========================
     SCHEMA
  ========================== */

  setUpDatabase() {

    /* -------------------------
       CARS TABLE
    -------------------------- */

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        car_name_and_no TEXT NOT NULL,
        daily_rate REAL NOT NULL,
        commission_per_day REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    /* -------------------------
       BOOKINGS TABLE
    -------------------------- */

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
     ADD CAR
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

  /* =========================
     GET CARS
  ========================== */

  getAllCars() {
    const statement = this.db.prepare(`
      SELECT * FROM cars ORDER BY id DESC
    `)

    return statement.all()
  }

  /* =========================
     ADD BOOKING
  ========================== */

  addBooking(data) {


    /* -------------------------
       GET CAR
    -------------------------- */

    const car = this.db.prepare(`
      SELECT * FROM cars WHERE car_name_and_no = ?
    `).get(data.carName)

    if (!car) {
      throw new Error("Car not found here Azhar!")
    }

    /* -------------------------
       CALCULATE DAYS
    -------------------------- */

    const start = new Date(data.start_date)
    const end = new Date(data.end_date)

    const diffInMs = end.getTime() - start.getTime()

    const number_of_days = Math.max(
      Math.ceil(diffInMs / (1000 * 60 * 60 * 24)),
      1
    )

    /* -------------------------
       CALCULATIONS
    -------------------------- */

    const daily_rate = car.daily_rate
    const total_rental = number_of_days * daily_rate
    const commission_due = number_of_days * car.commission_per_day

    /* -------------------------
       INSERT BOOKING
    -------------------------- */

    const statement = this.db.prepare(`
      INSERT INTO bookings (
        car_id,
        booked_by,
        car_provided_by,
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
      car.id,
      data.customer_name,
      data.car_provided_by,
      data.start_date,
      data.end_date,
      number_of_days,
      daily_rate,
      total_rental,
      commission_due,
      data.notes
    )
  }
}

export default AppDatabase