import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electron_backbone', {

  sendMessage : (message: any) => ipcRenderer.send('message', message)
});