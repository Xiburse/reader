import File from "./File"
import {
    remote
} from "electron"

export default {
    addReadingBook: function (nid, src, b) {
        var reading = new File(remote.getGlobal("optionsPath") + "\\reading.json")

        var readingBookJson = JSON.parse(reading.readString("utf-8"))
        var json = JSON.parse("{}")
        json.src = src
        json.nid = nid
        json.b = b
        readingBookJson.readingBook.push(json)

        reading.write("utf-8", JSON.stringify(readingBookJson))
    },
    save: function (nid, src, b) {
        var reading = new File(remote.getGlobal("optionsPath") + "\\reading.json")

        var readingBookJson = JSON.parse(reading.readString("utf-8"))
        console.log(readingBookJson)
        var ifSave = false
        for (var i = 0; i < readingBookJson.readingBook.length; i++) {
            if(readingBookJson.readingBook[i].nid == nid) {
                readingBookJson.readingBook[i].src = src
                readingBookJson.readingBook[i].b = b
                
                reading.write("utf-8", JSON.stringify(readingBookJson))
                ifSave = true
                break
            }
        }
        return ifSave
    },
    getData: function (nid) {
        var reading = new File(remote.getGlobal("optionsPath") + "\\reading.json")
        var src = "null"
        var b = -1

        var readingBookJson = JSON.parse(reading.readString("utf-8"))
        for (var i = 0; i < readingBookJson.readingBook.length; i++) {
            if(readingBookJson.readingBook[i].nid == nid) {
                src = readingBookJson.readingBook[i].src
                b = readingBookJson.readingBook[i].b
                break
            }
        }

        return {"src": src, "b": b}
    }
}