import File from "./File"
import xml2js from "xml2js"
import BookMessage from "./BookMessage"
import BookListMessage from "./BookListMessage"
import store from "../store/index"
import globalBus from "./globalBus"
import {
    nanoid
} from "nanoid"
import {
    remote
} from "electron"

var updateBookList = {
    addBookList: async function (path, nid) {
        var toc = new File(path + "\\OEBPS\\toc.ncx")

        var bookList = new File(remote.getGlobal("optionsPath") + "\\bookList.json")
        var bookListJson = JSON.parse(bookList.readString("utf-8"))

        var xmlParser = new xml2js.Parser({
            explicitArray: false
        })

        xmlParser.parseString(toc.readString("utf-8"), function (err, result) {
            var bookMessage = new BookMessage(result.ncx)
            var json = JSON.parse("{}")
            json.id = nid
            json.title = bookMessage.getTitle()
            json.author = bookMessage.getAuthor()
            json.list = bookMessage.jsonList

            bookListJson.bookList.push(json)
            bookList.write("utf-8", JSON.stringify(bookListJson))

            globalBus.$emit("addBookList", json)
        })

    }
}

export default updateBookList