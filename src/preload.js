import { contextBridge, ipcRenderer } from "electron";

console.log("🟣 PRELOAD LOADED");

contextBridge.exposeInMainWorld("api", {
  getCars: () => ipcRenderer.invoke("car:getAll")
});
