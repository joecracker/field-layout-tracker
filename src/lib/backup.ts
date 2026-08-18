import {
  connectDrive,
  disconnectDrive,
  isDriveConnected,
  saveToDrive,
  loadFromDrive,
  type DriveBackupConfig,
} from './googleDrive';

// "Apps/Field Layout Tracker/backups" in Tim's Drive (see GOOGLE_DRIVE_SETUP.md to change).
const FOLDER_ID = '13Mv58chU7IWLIUJ0iMYUEYyoUy5-_SGV';
const FILE_NAME = 'nextlevel-projects-backup.json';
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const driveConfigured = Boolean(CLIENT_ID);

function cfg(): DriveBackupConfig {
  return { clientId: CLIENT_ID, folderId: FOLDER_ID, fileName: FILE_NAME };
}

export { isDriveConnected, disconnectDrive };

export async function connectBackup(): Promise<void> {
  await connectDrive(CLIENT_ID);
}

export async function saveBackup(data: unknown) {
  return saveToDrive(cfg(), data);
}

export async function restoreBackup<T = unknown>(): Promise<T | null> {
  return loadFromDrive<T>(cfg());
}
