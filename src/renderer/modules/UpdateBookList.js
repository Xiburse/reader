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
        var content = new File(path + "\\OEBPS\\content.opf")

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

            xmlParser.parseString(content.readString("utf-8"), function (err, result) {
                console.log(result)

                var contentJson = JSON.parse("{}")

                contentJson.message = {}
                contentJson.message.title = result.package.metadata["dc:title"]
                contentJson.message.author = result.package.metadata["dc:creator"]._
                contentJson.message.language = result.package.metadata["dc:language"]
                contentJson.message.rights = result.package.metadata["dc:rights"]
                contentJson.message.subject = result.package.metadata["dc:subject"]
                contentJson.message.description = result.package.metadata["dc:description"]
                contentJson.message.source = result.package.metadata["dc:source"]
                contentJson.message.publisher = result.package.metadata["dc:publisher"]
                if (result.package.metadata.meta) {
                    if (result.package.metadata.meta instanceof Array) {
                        result.package.metadata.meta.forEach(element => {
                            if (element.$.name == "cover") {
                                contentJson.message.cover = element.$.content
                            }
                        });
                    } else if (result.package.metadata.meta.$.name == "cover") {
                        contentJson.message.cover = result.package.metadata.meta.$.content
                    }
                }

                var manifest = {}
                result.package.manifest.item.forEach(element => {
                    manifest[element.$.id] = {}
                    manifest[element.$.id].href = element.$.href
                })
                contentJson.manifest = manifest

                contentJson.message.cover = contentJson.manifest[contentJson.message.cover].href

                var spine = new Array()
                result.package.spine.itemref.forEach(element => {
                    spine.push(element.$.idref)
                })
                contentJson.spine = spine

                json.content = contentJson

                bookListJson.bookList.push(json)
                bookList.write("utf-8", JSON.stringify(bookListJson))

                globalBus.$emit("addBookList", json)
            })
        })

    }
}

export default updateBookList