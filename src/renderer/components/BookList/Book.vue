<template>
    <div :style="bookStyle"
         class="bookBox"
         @mouseenter="bookBoxMouseEnter"
         @mouseleave="bookBoxMouseLeave"
         @click.right="bookBoxClickRight"
         @click.left="bookBoxClickLeft">
        <div class="bookCoverBox"
             :style="bookCoverBoxStyle">
            <img :src="coverPath"
                 alt="图片未加载"
                 :class="bookCoverClass"
                 :style="[bookStyle, bookCoverStyle]"
                 align="middle">
            <transition name="expandRoundButtonTran">
                <div class="expandBox"
                     :style="expandBoxStyle"
                     v-show="ifExpandRoundButton">
                    <div @click="moreBookClick"
                         class="moreBookClass">
                        <expand-round-button :style="expandRoundButtonStyle"
                                             :width="50"
                                             expandLogoPath="static/more.svg"
                                             prop="more"></expand-round-button>
                    </div>
                    <div @click="deleteBookClick"
                         class="deleteBookClass">
                        <expand-round-button :style="expandRoundButtonStyle"
                                             :width="50"
                                             expandLogoPath="static/delete.svg"
                                             prop="delete"></expand-round-button>
                    </div>
                </div>
            </transition>
        </div>
        <div class="aboutTextBox"
             :style="aboutTextBoxStyle"
             v-if="ifVertical">
            <div class="titleTextBox" :style="titleTextBoxStyle">{{list.title}}</div>
            <div class="authorTextBox" :style="authorTextBoxStyle">{{list.author}}</div>
        </div>
    </div>
</template>

<script>
import { remote } from "electron"
import ExpandRoundButton from "./ExpandRoundButton.vue"
import BookListMessage from '@/modules/BookListMessage'

export default {
    name: "Book",
    components: {
        ExpandRoundButton
    },
    methods: {
        bookBoxMouseEnter: function (e) {
            this.bookCoverClass = "bookCoverHover"
        },
        bookBoxMouseLeave: function (e) {
            this.bookCoverClass = "bookCover"
            this.ifExpandRoundButton = false
            this.bookCoverStyle.filter = ""
            this.bookCoverStyle.transform = ""
        },
        bookBoxClickLeft: function (e) {
            this.$router.push({ name: "ReadBook", params: { nid: this.nid, list: this.list } })
        },
        bookBoxClickRight: function () {
            this.ifExpandRoundButton = true
            this.bookCoverStyle.transform = "scale(1.2, 1.2)"
        },
        deleteBookClick: function (e) {
            e.stopPropagation()
            BookListMessage.deleteBook(this.nid)
        },
        moreBookClick: function (e) {
            e.stopPropagation()
            this.$store.commit("setPublicBookMessage", this.list)
            this.$store.commit("setPublicBookMessageIfShow", true)
            document.body.style.overflow = "hidden"
        }
    },
    props: {
        width: Number,
        height: Number,
        nid: String,
        list: Object,
        ifVertical: Boolean
    },
    data: function () {
        return {
            coverPath: remote.getGlobal("cachePath") + "\\" + this.nid + "\\OEBPS\\Images\\cover.jpg",
            bookStyle: {
                width: this.ifVertical ? "80vw" : this.width + "px",
                height: this.height + "px",
                display: this.ifVertical ? "block" : "inline-block"
            },
            bookCoverBoxStyle: {
                width: this.width + "px",
                height: this.height + "px"
            },
            bookCoverClass: "bookCover",
            bookCoverStyle: {
                width: this.width + "px",
                height: this.height + "px",
                filter: "",
                transform: "",
                float: "left",
                display: "inline"
            },
            expandBoxStyle: {
                width: this.width + "px",
                height: this.height + "px"
            },

            ifExpandRoundButton: false,

            expandRoundButtonStyle: {
                margin: "20px auto 20px auto"
            },

            aboutTextBoxStyle: {
                height: this.height + "px",
                maxWidth: "calc(100vw - 20vw - " + this.width + "px)"
            },
            titleTextBoxStyle: {
                fontSize: this.width / 8 + "px"
            },
            authorTextBoxStyle: {}
        }
    },
    created: function () { },
    mounted: function () { }
}
</script>

<style>
.bookBox {
    transition: 0.4s;
    font-family: "等线";
    font-size: 0.85em;
    font-weight: lighter;
    color: rgba(255, 255, 255, 0.884);
    text-align: left;
    letter-spacing: 1px;
    white-space: nowrap;
}

.bookBox:hover {
    transition: 0.4s;
    transform: scale3d(1.05, 1.05, 1);
}

.bookCoverBox {
    transition: 0.4s;
    overflow: hidden;
    display: inline-block;
    float: left;
    box-shadow: 0px 4px 20px rgba(95, 95, 95, 0.384);
}
.bookCoverBox:hover {
    transition: 0.4s;
    box-shadow: 0px 4px 40px rgba(63, 63, 63, 0.452);
}

.bookCover,
.bookCoverHover {
    /* max-width: 100%;
    max-height: 100%; */
    transition: 0.4s;

    display: block;
    object-fit: cover;
    will-change: transform;
}

.bookCoverHover {
    /* filter: saturate(150%) blur(5px); */
    /* transform: scale(1.2, 1.2); */
}

.expandBox {
    position: relative;
    display: table;
    top: -100%;
    left: 0%;
    backdrop-filter: saturate(200%);
    background-color: rgba(32, 32, 32, 0.815);
    /* transform: scale3d(1.1, 1.1, 1); */
}

.aboutTextBox {
    display: inline-block;
    float: right;
    color: black;
}

.titleTextBox {
    font-weight: 700;
    margin: 10px auto 10px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
}
.authorTextBox {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    margin: 10px auto 10px 10px;
}

.expandRoundButtonTran-enter-active,
.expandRoundButtonTran-enter-active .moreBookClass,
.expandRoundButtonTran-enter-active .deleteBookClass {
    transition: 0.8s cubic-bezier(0.03, 0.98, 0.22, 0.99);
}
.expandRoundButtonTran-leave-active,
.expandRoundButtonTran-leave-active .moreBookClass,
.expandRoundButtonTran-leave-active .deleteBookClass {
    transition: 0.4s ease-out;
}
.expandRoundButtonTran-enter,
.expandRoundButtonTran-leave-to,
.expandRoundButtonTran-enter .moreBookClass,
.expandRoundButtonTran-leave-to .moreBookClass {
    opacity: 0;
    /* transform: scale3d(1.5, 1.5, 1); */
    transform: translate3d(0px, 100px, 0px);
}

.expandRoundButtonTran-enter .deleteBookClass,
.expandRoundButtonTran-leave-to .deleteBookClass {
    opacity: 0;
    transform: translate3d(0px, 200px, 0px);
}
</style>
