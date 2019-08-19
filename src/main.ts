import { app, BrowserWindow, clipboard, globalShortcut, session, ipcMain, screen, WebContents, dialog } from 'electron';
import * as path from 'path';
import * as robot from 'robotjs';
import * as url from 'url';
import { initAutoUpdate } from './autoupdater';
import { setMenu } from './menu';
import { autoUpdater } from 'electron-updater';
import { RESTART_AND_UPDATE } from './events';

let win: BrowserWindow | null;
const params = '';
const WEBPACK_DEV_SERVER = 'http://localhost:2003/';

let SHORTCUT_KEY = 'Control+K';

// Initialize Sentry

const installExtensions = async () => {
  // eslint-disable-next-line
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(err => {
    console.log(err);
  });
};

function failToLoad() {
  console.log('fail to load url/path or reload of the app');
  goToUrl();
}

const goToUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    win!.loadURL(`${WEBPACK_DEV_SERVER}${params}`);
  } else {
    win!.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 700,
    height: 600,
    title: 'Test Github Actions',
    show: false,
    center: true,
    webPreferences: {
      webSecurity: false, // this allows no-cors to send headers from index.html
    },
  });
  const x = Math.floor((screen.getPrimaryDisplay().size.width - 700) / 2);
  const y = Math.floor(screen.getPrimaryDisplay().size.height * 0.15);
  win!.setPosition(x, y);

  goToUrl();

  // avoid visual flash
  win.once('ready-to-show', () => {
    win && win.show();
  });

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools
    win.webContents.once('dom-ready', () => {
      win && win.webContents.openDevTools();
    });
  }

  win.webContents.on('crashed', () => {
    win!.destroy();
    createWindow();
  });

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('did-fail-load', failToLoad);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('ready', () => {
  createWindow();
  if (process.env.NODE_ENV === 'production') {
    // Add Menu
    setMenu();
  }

    globalShortcut.register(SHORTCUT_KEY, async () => {
      if (!win!.isFocused()) {
        if (process.platform === 'darwin') {
          robot.keyTap('c', 'command');
        } else {
          robot.keyTap('c', 'control');
        }
        win!.webContents.send('shortcut key search', { text: clipboard.readText(), focused: false });
        win!.show();
      } else {
        win!.webContents.send('shortcut key search', { focused: true });
      }
    });

    if (!globalShortcut.isRegistered(SHORTCUT_KEY)) {
      console.log('registration failed');
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered(SHORTCUT_KEY));

  ipcMain.on('unregister search shortcut', () => {
    console.log('unregister');
    globalShortcut.unregister(SHORTCUT_KEY);
  });

  ipcMain.on(RESTART_AND_UPDATE, () => {
    autoUpdater.quitAndInstall();
  });
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

interface WebContent extends WebContents {
  history: string[];
}
