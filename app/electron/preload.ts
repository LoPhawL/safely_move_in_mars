import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld('electron_backbone', {

  sendMessage : (message: any) => ipcRenderer.send('message', message),

  onMessageResult: (callback: (result: any) => void) => {

    const listener = (_event: IpcRendererEvent, result: any) => callback(result);
    ipcRenderer.on('message-result', listener);
    
    return () => { ipcRenderer.removeListener('message-result', listener); };
  }

});