import {
    app,
    BrowserWindow,
    protocol
} from 'electron'
import fs from "fs"
import path from "path"

global["userPath"] = process.env.USERPROFILE
global["erPath"] = process.env.USERPROFILE + "\\epub-reader"
global["cachePath"] = process.env.USERPROFILE + "\\epub-reader\\cache"
global["optionsPath"] = process.env.USERPROFILE + "\\epub-reader\\options"

fs.stat(global["erPath"], function (err) {
    if (err) {
        fs.mkdir(global["erPath"])
    }
})

fs.stat(global["optionsPath"], function (err) {
    if (err) {
        fs.mkdir(global["optionsPath"])
    }
})

fs.stat(global["optionsPath"] + "\\bookList.json", function (err) {
    if (err) {
        fs.writeFile(global["optionsPath"] + "\\bookList.json", "{\"bookList\":[]}", {
            encoding: "utf-8"
        })
    }
})

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        show: false,
        height: 563,
        useContentSize: true,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            experimentalFeatures: true,
            enableRemoteModule: true,
            webviewTag: true
        },
        // transparent: true,
        // frame: false,
        // backgroundColor: '#00000000'
    })

    mainWindow.setMenu(null)
    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.on('ready-to-show', function () {
        mainWindow.show()
    })

    protocol.interceptFileProtocol('file', function (request, callback, next) {
        // console.log('protocol.interceptFileProtocol', request);
        // callback({ statusCode: 400, data: 'Host Not Allowed' });
        // const url = request.url.substr(8);
        // var fPath = `file://${__dirname}/dist/index.html`;
        var fPath = request.url.substr(8); // 截取file:///之后的内容，也就是我们需要的
        if (fPath.indexOf('element-icons') >= 0 && fPath.indexOf('.woff') >= 0) fPath = gElementIconsWoff;
        if (fPath.indexOf('element-icons') >= 0 && fPath.indexOf('.ttf') >= 0) fPath = gElementIconsTtf;

        fPath = path.normalize(fPath);
        fPath = fPath.split("#")[0];
        console.log('protocol.interceptFileProtocol', fPath)
        callback(fPath);
        return true;

    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */