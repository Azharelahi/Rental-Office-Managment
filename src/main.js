import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

import AppDatabase from './db/database.js';
import {
  updateBooking,
  getAllBookings,
  addNewBooking,
  deleteBooking,
  getBookingById
} from './db/lib.js';

if (started) {
  app.quit();
}

let db;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    alwaysOnTop: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools();
};

// ---------------- APP READY ----------------
app.whenReady().then(() => {

  db = new AppDatabase();

  // ---------------- CAR ----------------
  ipcMain.handle("car:getAll", () => {
    return db.getAllCars();
  });
ipcMain.handle("booking:update", (event, data) => {
  return updateBooking(data);
});
  // ---------------- BOOKINGS (READ ALL) ----------------
  ipcMain.handle("booking:getAll", () => {
    return getAllBookings();
  });

  // ---------------- CREATE ----------------
  ipcMain.handle("booking:create", (event, bookingData) => {
    const result = addNewBooking(bookingData);

    return {
      success: true,
      id: result.id
    };
  });

  // ---------------- DELETE ----------------
  ipcMain.handle("booking:delete", (event, payload) => {
    return deleteBooking(payload.booking_id);
  });

  // ---------------- GET BY ID ----------------
  ipcMain.handle("booking:getById", (event, payload) => {
    return getBookingById(payload.booking_id);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// ---------------- CLOSE APP ----------------
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});