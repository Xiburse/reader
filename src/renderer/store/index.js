import Vue from 'vue'
import Vuex from 'vuex'
import BookListMessage from "../modules/BookListMessage"

import {
    createPersistedState,
    createSharedMutations
} from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    plugins: [
        // createPersistedState(),
        // createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production',
    state: {
        bookList: [],
        publicBookMessage: {
            id: "",
            title: "",
            author: "",
            ifShow: false
        }
    },
    mutations: {
        init(state) {
            state.bookList = BookListMessage.getBookList()
        },
        addBookList (state, json) {
            state.bookList.push(json)
        },
        deleteBookList (state, index) {
            state.bookList.splice(index, 1)
        },
        setPublicBookMessage(state, list) {
            state.publicBookMessage.id = list.id
            state.publicBookMessage.title = list.title
            if(list.author == null) {
                state.publicBookMessage.author = "无"
            } else {
                state.publicBookMessage.author = list.author
            }
        },
        setPublicBookMessageIfShow(state, ifShow) {
            state.publicBookMessage.ifShow = ifShow
        }
    }
})