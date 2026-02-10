import { app, BrowserWindow, ipcMain } from 'electron'
import url  from 'url'
import path from 'path'
import { analyseRobotPositions } from '../grid_on_mars'
import { TRobotCoordinate } from '../types/robotCoordinate.type'
import { TRobotOrientation } from '../types/robotOrientation.type'

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
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

ipcMain.on('message', (event, message: {
  gridDimensions: [number, number],
  robotSettings: { 
    initialPosition: {
      coordinate: TRobotCoordinate,
      orientation: TRobotOrientation
    },
    movementInstructions: string
  }[]
} ) => {

  const res = analyseRobotPositions(message.gridDimensions, message.robotSettings);
  event.reply('message-result', res);  
});