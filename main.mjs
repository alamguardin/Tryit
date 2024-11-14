import electron from 'electron';
import Server from './server.mjs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const localServer = new Server();

localServer.setPort(8080);
localServer.setStatic(path.join(__dirname, 'app/dist'));
localServer.run();

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const createWindow = () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	window.loadURL('http://localhost:8080/');
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
