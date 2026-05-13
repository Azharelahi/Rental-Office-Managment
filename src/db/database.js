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

        car_name TEXT NOT NULL,

        plate_number TEXT UNIQUE NOT NULL,

        car_type TEXT NOT NULL,

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

        booked_by TEXT NOT NULL
        CHECK (
          booked_by IN (
            'Hammad Direct',
            'Auto Hire'
          )
        ),

        client_name TEXT,

        start_date TEXT NOT NULL,

        end_date TEXT NOT NULL,

        notes TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (car_id)
        REFERENCES cars(id)

      )

    `)


    /* =========================
       TABLE 3 : OUTSIDE HIRES
    ========================== */

    this.db.exec(`

      CREATE TABLE IF NOT EXISTS outside_hires (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        date TEXT NOT NULL,

        car_type_hired TEXT NOT NULL,

        number_of_days INTEGER NOT NULL,

        cost_paid REAL NOT NULL,

        notes TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

      )

    `)

  }


  /* =========================
     INSERT CAR
  ========================== */

  addCar(data) {

    const statement = this.db.prepare(`

      INSERT INTO cars (

        car_name,
        plate_number,
        car_type,
        daily_rate,
        commission_per_day

      )

      VALUES (?, ?, ?, ?, ?)

    `)

    return statement.run(

      data.car_name,
      data.plate_number,
      data.car_type,
      data.daily_rate,
      data.commission_per_day

    )
  }


  /* =========================
     INSERT BOOKING
  ========================== */

  addBooking(data) {

    const statement = this.db.prepare(`

      INSERT INTO bookings (

        car_id,
        booked_by,
        client_name,
        start_date,
        end_date,
        notes

      )

      VALUES (?, ?, ?, ?, ?, ?)

    `)

    return statement.run(

      data.car_id,
      data.booked_by,
      data.client_name,
      data.start_date,
      data.end_date,
      data.notes

    )
  }


  /* =========================
     GET BOOKINGS WITH FORMULAS
  ========================== */

  getBookingsWithCalculations() {

    const statement = this.db.prepare(`

      SELECT

        bookings.booking_id,

        cars.car_name,

        cars.car_type,

        bookings.booked_by,

        bookings.client_name,

        bookings.start_date,

        bookings.end_date,


        /* =====================
           NUMBER OF DAYS
        ====================== */

        CAST(
          julianday(bookings.end_date)
          -
          julianday(bookings.start_date)
          AS INTEGER
        ) AS number_of_days,


        /* =====================
           TOTAL RENTAL
        ====================== */

        (
          CAST(
            julianday(bookings.end_date)
            -
            julianday(bookings.start_date)
            AS INTEGER
          )
          *
          cars.daily_rate
        ) AS total_rental,


        /* =====================
           COMMISSION DUE
        ====================== */

        CASE

          WHEN bookings.booked_by = 'Auto Hire'

          THEN

            (
              CAST(
                julianday(bookings.end_date)
                -
                julianday(bookings.start_date)
                AS INTEGER
              )
              *
              cars.commission_per_day
            )

          ELSE 0

        END AS commission_due,


        bookings.notes

      FROM bookings

      INNER JOIN cars
      ON bookings.car_id = cars.id

      ORDER BY bookings.booking_id DESC

    `)

    return statement.all()
  }

}

export default AppDatabase