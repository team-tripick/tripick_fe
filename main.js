/* eslint-disable @typescript-eslint/no-require-imports */

const { app, BrowserWindow } = require('electron');
const next = require('next');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: __dirname });
const handle = nextApp.getRequestHandler();

let mainWindow;

async function createWindow() {
  try {
    await nextApp.prepare();

    // HTTP 서버 생성
    const server = http.createServer((req, res) => {
      handle(req, res);
    });
    
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Next.js server running on http://localhost:3000');
    });

    // 브라우저 윈도우 생성
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    mainWindow.loadURL('http://localhost:3000');

    // 개발 모드에서는 DevTools 열기
    if (dev) {
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

  } catch (error) {
    console.error('Failed to create window:', error);
    app.quit();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});