import Vue from 'vue'
import Vuex from 'vuex'
import BookListMessage from "@/modules/BookListMessage"

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
        },

        moveBackgroundProp: {
            width: "0",
            height: "0",
            left: "0",
            top: "0",

            change: false,
            moveBackgroundIf: false
        },

        ifBlack: false,
        bookModNumber: 1
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
        },

        setMoveBackgroundProp(state, list) {
            state.moveBackgroundProp.width = list.width
            state.moveBackgroundProp.height = list.height
            state.moveBackgroundProp.left = list.left
            state.moveBackgroundProp.top = list.top

            state.moveBackgroundProp.change = list.change
        },

        setMoveBackgroundPropIf(state, bool) {
            state.moveBackgroundProp.moveBackgroundIf = bool
        },

        setBlack(state, bool) {
            state.ifBlack = bool
        },
        
        setBookModNumber(state, str) {
            state.bookModNumber = str
        }
    }
})