/* eslint-disable import/no-extraneous-dependencies */
import { autoUpdater } from 'electron-updater';
import { dialog, webContents } from 'electron';
import { ProgressInfo } from 'builder-util-runtime';
import { UPDATE_DOWNLOADED } from './events';

// autoupdate
export const initAutoUpdate = () => {
  autoUpdater.checkForUpdatesAndNotify();
};

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
});

autoUpdater.on('error', error => {
  // ignore code-sign error when user presses restart app. The app is code-signed by default because of electron-builder, otherwise autoupdate would not work at all. If you completely close the app instead of using restart button, the error does not show up. Anyway, the update is applied succesfully no matter if this particular error shows or not.
  if (!error.stack.includes('Could not get code signature for running application')) {
    dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
  }
});

autoUpdater.on('update-not-available', () => {
  console.log('No updates available...');
});

autoUpdater.on('update-available', info => {
  console.log('Update available:', info);
});

autoUpdater.on('download-progress', (progressObj: ProgressInfo) => {
  const logMessage = `Download speed: ${progressObj.bytesPerSecond} \nDownloaded ${progressObj.percent}% \n(${progressObj.transferred}/${progressObj.total})`;
  console.log(logMessage);
});
autoUpdater.on('update-downloaded', info => {
  console.log('Update downloaded:', info);
  webContents.getAllWebContents().forEach(webContent => {
    webContent.send(UPDATE_DOWNLOADED);
  });
});
