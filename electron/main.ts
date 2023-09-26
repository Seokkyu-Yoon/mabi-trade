import { app, BrowserWindow, globalShortcut, Menu } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
const envDist = path.join(__dirname, '../dist')
const envVitePublic = app.isPackaged ? envDist : path.join(envDist, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
const nodeEnv = process.env.NODE_ENV

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(envVitePublic, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.setMenu(
    Menu.buildFromTemplate([
      {
        label: 'Application',
        submenu: [
          {
            label: 'help',
            accelerator: 'F1',
            click() {
              showHelp()
            },
          },
          {
            label: 'quit',
            accelerator: 'CmdOrCtrl+Q',
            click() {
              app.quit()
            },
          },
        ],
      },
    ]),
  )
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(envDist, 'index.html'))
  }

  if (nodeEnv === 'development') {
    globalShortcut.register('CmdOrCtrl+D', () => {
      win?.webContents.openDevTools()
    })
  }
}

function showHelp() {
  win?.webContents.send('event:help')
}
function quit() {
  app.quit()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
app.whenReady().then(createWindow)
