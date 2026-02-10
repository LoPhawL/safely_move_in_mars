import { app, BrowserWindow } from 'electron'
import url  from 'url'
import path from 'path'

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
  })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '..', 'ui', 'browser', 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
}

app.whenReady().then(() => {

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})