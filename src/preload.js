import { contextBridge, ipcRenderer } from "electron";

console.log("🟣 PRELOAD LOADED");

contextBridge.exposeInMainWorld("api", {

  // cars
  getCars: () => ipcRenderer.invoke("car:getAll"),

  // bookings
  getBookings: () => ipcRenderer.invoke("booking:getAll"),
  createBooking: (data) => ipcRenderer.invoke("booking:create", data),

  // CRUD
  bookingDelete: (payload) =>
    ipcRenderer.invoke("booking:delete", payload),

  bookingGet: (payload) =>
    ipcRenderer.invoke("booking:getById", payload),
  bookingUpdate: (data) =>
    ipcRenderer.invoke("booking:update", data)
});