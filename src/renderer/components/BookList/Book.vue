<template>
    <div :style="bookStyle"
         :class="bookBoxClass"
         @mouseenter="bookBoxMouseEnter"
         @mouseleave="bookBoxMouseLeave"
         @click.right="bookBoxClickRight"
         @click.left="bookBoxClickLeft">
        <div :class="bookCoverBoxClass"
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
        <div :class="aboutTextBoxClass"
             :style="aboutTextBoxStyle"
             v-if="ifVertical">
            <div class="titleTextBox"
                 :style="titleTextBoxStyle">{{list.content.message.title}}</div>
            <div class="authorTextBox"
                 :style="authorTextBoxStyle">{{list.content.message.author}}</div>
        </div>
    </div>
</template>

<script>
import { remote } from "electron"
import { nanoid } from "nanoid"
import ExpandRoundButton from "./ExpandRoundButton.vue"
import BookListMessage from '@/modules/BookListMessage'
import globalBus from "@/modules/globalBus"

export default {
    name: "Book",
    components: {
        ExpandRoundButton
    },
    computed: {
        bookBoxClass: function () {
            return "bookBox" + (this.$store.state.ifBlack ? "Black" : "")
        },
        aboutTextBoxClass: function () {
            return "aboutTextBox" + (this.$store.state.ifBlack ? "Black" : "")
        },
        bookCoverBoxClass: function () {
            return "bookCoverBox" + (this.$store.state.ifBlack ? "Black" : "")
        }
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
            globalBus.$emit("exchange", this.nid)
            this.$router.push({ name: "ReadBook", params: { nid: this.nid, list: this.list } })
        },
        bookBoxClickRight: function () {
            this.ifExpandRoundButton = true
            this.bookCoverStyle.transform = "scale(1.2, 1.2)"
            this.bookCoverStyle.filter = "brightness(50%)"
        },
        deleteBookClick: function (e) {
            e.stopPropagation()
            BookListMessage.deleteBook(this.nid)
        },
        moreBookClick: function (e) {
            e.stopPropagation()
            // this.$store.commit("setPublicBookMessage", this.list)
            // this.$store.commit("setPublicBookMessageIfShow", true)
            // document.body.style.overflow = "hidden"
            if (!this.ifMoreBookClick) {
                var a = new Array()
                a.push({ id: nanoid(), text: this.list.content.message.title })
                a.push({ id: nanoid(), text: this.list.content.message.author })
                globalBus.$emit("addMoreMessage", a)
                this.ifMoreBookClick = true
                setTimeout(() => {
                    this.ifMoreBookClick = false
                }, 3000);
            }
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
            // coverPath: remote.getGlobal("cachePath") + "\\" + this.nid + "\\OEBPS\\Images\\cover.jpg",
            coverPath: remote.getGlobal("cachePath") + "\\" + this.nid + "\\OEBPS\\" + this.list.content.message.cover.replace("/", "\\"),
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
            authorTextBoxStyle: {},

            ifMoreBookClick: false
        }
    },
    created: function () { },
    mounted: function () { }
}
</script>

<style>
.bookBox,
.bookBoxBlack {
    transition: 0.4s cubic-bezier(0.01, 0.94, 0.28, 0.98);
    font-family: "fc", "qk";
    font-size: 0.85em;
    font-weight: lighter;
    color: rgba(255, 255, 255, 0.884);
    text-align: left;
    letter-spacing: 1px;
    white-space: nowrap;
}
.bookBox:hover,
.bookBoxBlack:hover {
    transition: 0.4s cubic-bezier(0.01, 0.94, 0.28, 0.98);
    transform: scale3d(1.05, 1.05, 1);
}
.bookBoxBlack {
    color: rgba(0, 0, 0, 0.884);
}

.bookCoverBox,
.bookCoverBoxBlack {
    position: relative;
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
.bookCoverBoxBlack {
    box-shadow: 0px 4px 20px rgba(34, 34, 34, 0.384);
}
.bookCoverBoxBlack:hover {
    transition: 0.4s;
    box-shadow: 0px 4px 40px rgba(44, 44, 44, 0.452);
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
    position: absolute;
    display: table;
    top: -0%;
    left: 0%;
    /* backdrop-filter: saturate(200%); */
    background-color: rgba(32, 32, 32, 0);
    width: 100%;
    height: 100%;
}

.aboutTextBox,
.aboutTextBoxBlack {
    display: inline-block;
    float: right;
    color: black;
}
.aboutTextBoxBlack {
    color: white;
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
    /* transition: 0.8s cubic-bezier(0.61, 0.01, 0, 1.01); */
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
    top: 200px;
}

.expandRoundButtonTran-enter .deleteBookClass,
.expandRoundButtonTran-leave-to .deleteBookClass {
    opacity: 0;
    top: 100px;
}
</style>
