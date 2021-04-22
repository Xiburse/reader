<template>
    <transition name="readBookPageTran">
        <div :class="readBookPageBoxClass">
            <div class="bookTextPageBox">
                <webview class="bookTextIframe"
                         :src="iframeSrc"
                         ref="bookTextIframe"
                         nodeintegration></webview>
            </div>

            <div class="trigger"
                 @mouseenter="triggerMouseEnter"></div>
            <contents :class="contentsClass"
                      :nid="nid"
                      :iframeSrc="iframeSrc"
                      :list="list"
                      @mouseleave.native="contentsMouseLeave"></contents>
            <move-background style="pointer-events:none"></move-background>
        </div>
    </transition>
</template>

<script>
import globalBus from "@/modules/globalBus"
import { remote } from "electron"
import Contents from "./Contents.vue"
import MoveBackground from "../MoveBackground.vue"
import UpdateReadingBook from "@/modules/UpdateReadingBook"

export default {
    name: "ReadBookPage",
    components: {
        Contents,
        MoveBackground
    },
    computed: {
        readBookPageBoxClass: function () {
            return "readBookPageBox" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    methods: {
        triggerMouseEnter: function () {
            this.contentsIf = true
        },

        contentsMouseLeave: function () {
            this.contentsIf = false
        }
    },
    watch: {
        contentsIf: function () {
            if (this.contentsIf) {
                this.contentsClass = "contents"
            } else {
                this.contentsClass = "contentsHidden"
            }
        }
    },
    data: function () {
        return {
            nid: "",
            path: "",
            list: Object,

            contentsIf: false,
            contentsClass: "contentsHidden",

            iframeSrc: ""
        }
    },
    created: function () {
        this.nid = this.$route.params.nid
        this.path = remote.getGlobal("cachePath") + "\\" + this.nid
        this.list = this.$route.params.list
        console.log(this.list)

        this.$store.commit("setMoveBackgroundProp", { "width": "0", "height": "2", "left": "0", "top": "0", "change": false })
        this.$store.commit("setMoveBackgroundPropIf", false)
    },
    mounted: function () {
        var _this = this
        globalBus.$on("setIframeSrc", (src) => {
            this.iframeSrc = "file:///" + remote.getGlobal("cachePath").replace(/\\/g, "/") + "/" + this.nid + "/OEBPS/" + src
            console.log(this.iframeSrc)
        })

        const bti = this.$refs.bookTextIframe

        bti.addEventListener("load-commit", function () {
            var b = bti

            b.insertCSS(`
            body {
                ${_this.$store.state.ifBlack ? "background-color: rgb(0, 0, 0);" : ""}
            }
            ::-webkit-scrollbar {
                width: 5px;
            }
            ::-webkit-scrollbar-thumb {
                border-radius: 999px;
                background-color: rgba(0, 0, 0, 0.185);
            }
            ::-webkit-scrollbar-thumb:hover {
                background-color: rgba(0, 0, 0, 0.527);
            }
            ::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0.1);
            }
            img {
                width: 80vw;
                margin-left: 10vw;
                display: block;
                object-fit: cover;
                position: relative;
                pointer-events: none;
            }
            p, h1, h2, h3, h4, h5, h6, li {
                ${_this.$store.state.ifBlack ? "color: rgb(255, 255, 255);" : ""}
                margin-left: 10vw !important;
                margin-right: 10vw !important;
            }
            *::selection {
                background-color: rgba(56, 56, 56, 0.788);
                color: rgb(255, 255, 255);
            }
        `)
        })

        bti.addEventListener("dom-ready", function () {
            var b = bti
            // b.openDevTools()

            b.executeJavaScript(`
                const remote = require("electron").remote;
                window.addEventListener("scroll", function () {
                    var re = remote;
                    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                    var b = scrollTop / scrollHeight;
                    re.getGlobal("iframeOptions").b = b;
                });
                if(remote.getGlobal("iframeOptions").ifInit) {
                    var b = remote.getGlobal("iframeOptions").b;
                    var scrollTop = b * document.body.scrollHeight;
                    document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
                    remote.getGlobal("iframeOptions").ifInit = false
                }
            `)


        })

        var list = UpdateReadingBook.getData(this.nid)
        if (list.src == "null") {
            UpdateReadingBook.addReadingBook(this.nid, "", 0)
        } else {
            remote.getGlobal("iframeOptions").b = list.b
            remote.getGlobal("iframeOptions").ifInit = true
            this.iframeSrc = list.src
        }

    }
}
</script>
<style>
.readBookPageBox,
.readBookPageBoxBlack {
    position: relative;
    top: 0%;
    left: 0%;

    overflow: hidden;
}
.readBookPageBoxBlack {
    background-color: rgb(0, 0, 0);
}
.contents,
.contentsHidden {
    position: fixed;
    top: 0%;
    left: 0%;
    transition: 0.4s cubic-bezier(0.01, 0.94, 0.28, 0.98);
}
.contentsHidden {
    left: -300px;
}

.trigger {
    position: fixed;
    width: 10px;
    height: 100vh;
    top: 0%;
    left: 0%;
}

.bookTextPageBox {
    position: relative;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
}

.bookTextIframe {
    position: absolute;
    width: 100vw;
    height: 100vh;
}

.readBookPageTran-enter,
.readBookPageTran-leave-to {
    opacity: 0;
}
.readBookPageTran-enter-active,
.readBookPageTran-leave-active {
    transition: 0.4s cubic-bezier(0.01, 0.94, 0.28, 0.98);
}
</style>
