<template>
    <transition name="readBookPageTran">
        <div class="readBookPageBox">
            <div class="bookTextPageBox">
                <webview class="bookTextIframe"
                         :src="iframeSrc"
                         ref="bookTextIframe"></webview>
            </div>

            <div class="trigger"
                 @mouseenter="triggerMouseEnter"></div>
            <contents :class="contentsClass"
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

export default {
    name: "ReadBookPage",
    components: {
        Contents,
        MoveBackground
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
        globalBus.$on("setIframeSrc", (src) => {
            this.iframeSrc = "file:///" + remote.getGlobal("cachePath").replace(/\\/g, "/") + "/" + this.nid + "/OEBPS/" + src
            console.log(this.iframeSrc)
        })

        const bti = this.$refs.bookTextIframe
        bti.addEventListener("dom-ready", function () {
            var b = bti
            b.insertCSS(`
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
                margin-left: 10vw !important;
                margin-right: 10vw !important;
            }
            *::selection {
                background-color: rgba(56, 56, 56, 0.788);
                color: rgb(255, 255, 255);
            }
        `)
        })

    }
}
</script>
<style>
.readBookPageBox {
    position: relative;
    top: 0%;
    left: 0%;

    overflow: hidden;
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
