import {
    remote
} from "electron"
import File from "./File"
import { nanoid } from "nanoid"
import store from "../store/index"
import globalBus from "./globalBus"
import vue from "../main"
import UpdateReadingBook from "./UpdateReadingBook"

var BookListMessage = {
    getBookList: function () {
        var bookList = new File(remote.getGlobal("optionsPath") + "\\bookList.json")
        var bookListJson = JSON.parse(bookList.readString("utf-8"))
        return bookListJson.bookList
    },
    addBookFromDialog: function () {
        var filePath = File.openDialog()
        console.log(filePath)
        if (filePath == null) {
            return
        }
        var file = new File(filePath)
        var nid = nanoid()
        
        file.unZipToCachePath(remote.getGlobal("cachePath") + "\\" + nid, nid)
    },
    deleteBook: function (nid) {
        var bookList = new File(remote.getGlobal("optionsPath") + "\\bookList.json")
        var bookListJson = JSON.parse(bookList.readString("utf-8"))

        for(var i = 0; i < bookListJson.bookList.length + 1; i++) {
            if(bookListJson.bookList[i].id == nid) {
                globalBus.$emit("deleteBookList", i)
                break
            }
        }

        for(var i = 0; i < bookListJson.bookList.length; i++) {
            if(bookListJson.bookList[i].id == nid) {
                bookListJson.bookList.splice(i, 1)
                break
            }
        }
        bookList.write("utf-8", JSON.stringify(bookListJson))

        UpdateReadingBook.deleteReadingBook(nid)
        File.deleteBook(remote.getGlobal("cachePath") + "\\" + nid)
    }
}

export default BookListMessage