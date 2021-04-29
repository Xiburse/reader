import {
    app,
    BrowserWindow,
    protocol,
    ipcMain
} from 'electron'
import fs from "fs"
import path from "path"
import File from "./File"
import globalBus from "../renderer/modules/globalBus"

global["userPath"] = process.env.USERPROFILE
global["erPath"] = process.env.USERPROFILE + "\\epub-reader"
global["cachePath"] = process.env.USERPROFILE + "\\epub-reader\\cache"
global["optionsPath"] = process.env.USERPROFILE + "\\epub-reader\\options"

global["iframeOptions"] = {
    b: 0,
    ifInit: false,
    ifReadEnd: false
}
global["options"] = {
    ifBlack: false,
    bookModNumber: 0
}

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
        }, () => {})
    }
})

fs.stat(global["optionsPath"] + "\\reading.json", function (err) {
    if (err) {
        fs.writeFile(global["optionsPath"] + "\\reading.json", "{\"readingBook\":[]}", {
            encoding: "utf-8"
        }, () => {})
    }
})

fs.stat(global["optionsPath"] + "\\options.json", function (err) {
    if (err) {
        fs.writeFile(global["optionsPath"] + "\\options.json", "{\"ifBlack\":false,\"bookModNumber\":0}", {
            encoding: "utf-8"
        }, () => {})
    }
})

try {
    fs.statSync(global["optionsPath"] + "\\options.json")
    var optionsFile = new File(global["optionsPath"] + "\\options.json")
    var optionsJson = JSON.parse(optionsFile.readString("utf-8"))
    console.log(23333333)
    if (optionsJson.ifBlack) {
        global["options"].ifBlack = optionsJson.ifBlack
    }
    if (optionsJson.bookModNumber) {
        global["options"].bookModNumber = optionsJson.bookModNumber
    }
} catch (e) {
    console.log("err")
}

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
        useContentSize: true,
        width: 1000,
        height: 563,
        frame: false,
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

    mainWindow.on("unmaximize", function () {
        mainWindow.webContents.send("main-window-unmax")
    })

    ipcMain.on("window-max", function () {
        mainWindow.maximize()
    })
    ipcMain.on("window-res", function () {
        mainWindow.unmaximize()
    })
    ipcMain.on("window-min", function () {
        mainWindow.minimize()
    })
    ipcMain.on("window-close", function () {
        mainWindow.close()
    })

    ipcMain.on("read-end", function () {
        if (!global["iframeOptions"].ifReadEnd) {
            global["iframeOptions"].ifReadEnd = true
            mainWindow.webContents.send("add-end-button")
        }
    })
    ipcMain.on("read-no-end", function () {
        if (global["iframeOptions"].ifReadEnd) {
            global["iframeOptions"].ifReadEnd = false
            mainWindow.webContents.send("remove-end-button")
        }
    })

    // mainWindow.on("resize", function () {

    // })

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
    var optionsFile = new File(global["optionsPath"] + "\\options.json")
    optionsFile.write("utf-8", JSON.stringify(global["options"]))

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