class BookList {
    constructor(id, name, path, navPoint) {
        this.id = id
        this.name = name
        this.path = path
        this.navPoint = navPoint
    }
}

class BookMessage {
    constructor(ncx) {
        this.ncx = ncx
        this.title = ncx.docTitle.text
        if (ncx.docAuthor) {
            this.author = ncx.docAuthor.text
        } else {
            this.author = null
        }

        this.list = new Array()
        this.jsonList = new Array()
        ncx.navMap.navPoint.forEach(element => {
            var json = this.getNavPoing(element)
            this.jsonList.push(json)
            this.list.push(new BookList(json.id, json.name, json.path, json.navPoint))
            
        })
        console.log(this.jsonList)
        console.log(this.list)
    }

    getNavPoing(navPoint) {
        var _this = this
        var json = JSON.parse("{}")
        json.id = navPoint.$.id
        json.name = navPoint.navLabel.text
        json.path = navPoint.content.$.src
        json.navPoint = null
        var navPointJson = []
        if(navPoint.navPoint) {
            navPoint.navPoint.forEach(ele => {
                navPointJson.push(this.getNavPoing(ele))
            })
        }
        json.navPoint = navPointJson

        return json
    }

    getTitle() {
        if (this.title != undefined) {
            return this.title
        } else {
            return null
        }
    }

    getAuthor() {
        return this.author
    }

    getChapterId(num) {
        return this.list[num].id
    }

    getChapterName(num) {
        return this.list[num].name
    }

    getChapterPath(num) {
        return this.list[num].path
    }
}

export default BookMessage