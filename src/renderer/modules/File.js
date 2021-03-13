import fs from "fs"
import path from "path"
import Unzip from "decompress-zip"
import {
    remote
} from "electron"
import {
    resolve
} from "path"
import updateBookList from "./UpdateBookList"
import File from "./File"

class ReadFile {
    constructor(filePath) {
        this.options = {
            filePath: String,
            name: String
        }
        this.options.filePath = filePath

        let nameCache = this.options.filePath.toString().split("\\")
        this.options.name = nameCache[nameCache.length - 1]
    }

    readData() {
        return fs.readFileSync(this.options.filePath)
    }

    readString(encoding) {
        return fs.readFileSync(this.options.filePath, {
            encoding: encoding
        }).toString()
    }

    write(encoding, string) {
        fs.writeFileSync(this.options.filePath, string, {
            encoding: encoding
        })
        // fs.writeFile(this.options.filePath, string, {
        //     encoding: encoding
        // }, function () {})
    }

    isFileOrDirectory() {
        if (!fs.existsSync(this.options.filePath)) {
            return "none"
        }

        let stats = fs.statSync(this.options.filePath)
        if (stats.isFile()) {
            return "isFile"
        } else if (stats.isDirectory()) {
            return "isDirectory"
        }
    }

    createFile() {
        this.write("utf-8", "")
    }

    createDirectory() {
        fs.mkdir(this.options.filePath, function (err) {
            console.log(err)
        })
    }

    unZipToCachePath(path, nanoid) {
        let uz = new Unzip(this.options.filePath)
        uz.on("extract", function () {
            updateBookList.addBookList(path, nanoid)
        })
        uz.extract({
            path: path
        })
    }

    ifExist() {
        let _this = this
        return new Promise((resolve) => {
            fs.stat(_this.options.filePath, function (err, stats) {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    static deleteBook(path) {
        var stat = fs.statSync(path)
        if(stat.isFile()) {
            fs.unlinkSync(path)
            return
        }
        if(stat.isDirectory()) {
            var files = fs.readdirSync(path)
            if(files.length == 0) {
                fs.rmdirSync(path)
                return
            }
            files.forEach(file => {
                File.deleteBook(path + "\\" + file)
            })
            fs.rmdirSync(path)
        }
    }

    static openDialog() {
        const result = remote.dialog.showOpenDialogSync({
            properties: ['openFile']
        })
        if (result == undefined) {
            return null
        }
        return result[0]
    }
}

export default ReadFile