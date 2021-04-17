import BookListMessage from "./BookListMessage"

const store = {
    state: {
        bookList: [],
        ifAdd: false
    },
    setBookListToMessage() {
        this.state.bookList = BookListMessage.getBookList()
    },
    setBookList(json) {
        this.state.bookList = json
    },
    addBookList(json) {
        this.state.bookList.push(json)
    },
    deleteBookList(nid) {
        for(var i = 0; i < this.state.bookList.length; i++) {
            if(this.state.bookList[i].id == nid) {
                this.state.bookList.splice(i, 1)
                break
            }
        }
    }
}

export default store