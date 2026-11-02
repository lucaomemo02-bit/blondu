const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

if (!app.requestSingleInstanceLock()) { app.quit(); }

const SITE_URL = 'https://lucaomemo02-bit.github.io/blondu/www/index.html';
let win;
function criarJanela() {
  win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 380, minHeight: 560,
    backgroundColor: '#0f0d17', title: 'Blondu',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  Menu.setApplicationMenu(null);
  // Abre o mesmo site do celular: quando o index.html muda, o app de PC atualiza sozinho
  win.loadURL(SITE_URL);
  // Sem internet: usa a cópia que vem dentro do instalador
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (isMain && url.startsWith('https:')) win.loadFile(path.join(__dirname, 'www', 'index.html'));
  });
  // links externos abrem no navegador do sistema
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } });
}
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(criarJanela);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) criarJanela(); });
