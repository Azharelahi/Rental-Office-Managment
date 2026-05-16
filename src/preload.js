import { contextBridge, ipcRenderer } from "electron";

console.log("🟣 PRELOAD LOADED");

contextBridge.exposeInMainWorld("api", {
  getCars: () => ipcRenderer.invoke("car:getAll"),
  getBookings: () => ipcRenderer.invoke("booking:getAll"),
  createBooking: (bookingData) =>
    ipcRenderer.invoke("booking:create", bookingData)
});