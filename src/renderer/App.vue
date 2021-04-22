<template>
    <div id="app" :class="appClass">
        <div class="toolButtons">
            <span class="closeWindow"
                  @mouseenter="closeWindowMouseEnter"
                  @mouseleave="closeWindowMouseLeave"
                  @click.left="closeWindowMouseClickLeft">
                <transition name="toolButtonsTran">
                    <img :class="closeWindowLogoClass"
                         :src="closeWindowLogoSrc"
                         v-show="closeWindowIf">
                </transition>

            </span>
            <span class="maxWindow"
                  @mouseenter="maxWindowMouseEnter"
                  @mouseleave="maxWindowMouseLeave"
                  @click.left="maxWindowMouseClickLeft">
                <transition name="toolButtonsTran">
                    <img :class="maxWindowLogoClass"
                         :src="maxWindowLogoSrc"
                         v-show="maxWindowIf">
                </transition>
            </span>
            <span class="hiddenWindow"
                  @mouseenter="hiddenWindowMouseEnter"
                  @mouseleave="hiddenWindowMouseLeave"
                  @click.left="hiddenWindowMouseClickLeft">
                <transition name="toolButtonsTran">
                    <img :class="hiddenWindowLogoClass"
                         :src="hiddenWindowLogoSrc"
                         v-show="hiddenWindowIf">
                </transition>
            </span>
        </div>
        <router-view ref="main"></router-view>
    </div>
</template>

<script>
import store from "./store/index"
import { ipcRenderer, remote } from "electron"

export default {
    name: 'epub-reader',
    methods: {
        closeWindowMouseEnter: function () {
            this.closeWindowLogoClass = "closeWindowLogoHover"
            this.closeWindowIf = true
            this.closeWindowIfEnter = true
        },
        closeWindowMouseLeave: function () {
            this.closeWindowLogoClass = "closeWindowLogo"
            this.closeWindowIfEnter = false
            setTimeout(() => {
                if (!this.closeWindowIfEnter) {
                    this.closeWindowIf = false
                }
            }, 2000);
        },
        closeWindowMouseClickLeft: function () {
            ipcRenderer.send("window-close")
        },

        maxWindowMouseEnter: function () {
            this.maxWindowLogoClass = "maxWindowLogoHover"
            this.maxWindowIf = true
            this.maxWindowIfEnter = true
        },
        maxWindowMouseLeave: function () {
            this.maxWindowLogoClass = "maxWindowLogo"
            this.maxWindowIfEnter = false
            setTimeout(() => {
                if (!this.maxWindowIfEnter) {
                    this.maxWindowIf = false
                }
            }, 2000);
        },
        maxWindowMouseClickLeft: function () {
            if (this.ifMax) {
                this.maxWindowLogoSrc = "static/maximize.svg"
                ipcRenderer.send("window-res")
                this.ifMax = false
            } else {
                this.maxWindowLogoSrc = "static/minimize.svg"
                ipcRenderer.send("window-max")
                this.ifMax = true
            }
        },

        hiddenWindowMouseEnter: function () {
            this.hiddenWindowLogoClass = "hiddenWindowLogoHover"
            this.hiddenWindowIf = true
            this.hiddenWindowIfEnter = true
        },
        hiddenWindowMouseLeave: function () {
            this.hiddenWindowLogoClass = "hiddenWindowLogo"
            this.hiddenWindowIfEnter = false
            setTimeout(() => {
                if (!this.hiddenWindowIfEnter) {
                    this.hiddenWindowIf = false
                }
            }, 2000);
        },
        hiddenWindowMouseClickLeft: function () {
            ipcRenderer.send("window-min")
        }
    },
    computed: {
        appClass: function () {
            return "app" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    data: function () {
        return {
            closeWindowLogoClass: "closeWindowLogo",
            closeWindowLogoSrc: "static/delete.svg",
            closeWindowIf: false,
            closeWindowIfEnter: false,

            maxWindowLogoClass: "maxWindowLogo",
            maxWindowLogoSrc: "static/maximize.svg",
            ifMax: false,
            maxWindowIf: false,
            maxWindowIfEnter: false,

            hiddenWindowLogoClass: "hiddenWindowLogo",
            hiddenWindowLogoSrc: "static/hidden.svg",
            hiddenWindowIf: false,
            hiddenWindowIfEnter: false
        }
    },
    created: function () {
        store.commit("init")
        store.commit("setBlack", remote.getGlobal("options").ifBlack)
        store.commit("setBookModNumber", remote.getGlobal("options").bookModNumber)
        var _t = this
        ipcRenderer.on("main-window-unmax", function () {
            _t.ifMax = false
            _t.maxWindowLogoSrc = "static/maximize.svg"
        })

        
    }
}
</script>

<style>
/* CSS */
@font-face {
    font-family: "qk";
    src: url(./assets/qk.ttf);
}
@font-face {
    font-family: "fc";
    src: url(./assets/fc.ttf);
}

* {
    margin: 0px;
    user-select: none;
    font-family: "fc", "qk";
}
#app {
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
}
.app {
    background-color: rgb(255, 255, 255);
}
.appBlack {
    background-color: rgb(0, 0, 0);
}
body {
    /* background-color: rgba(255, 255, 255, 0.466);
    backdrop-filter: blur(20px); */
    overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: rgb(165, 165, 165);
}
::-webkit-scrollbar-thumb:hover {
    background-color: rgb(65, 65, 65);
}
::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}

.toolButtons {
    position: fixed;
    top: 0px;
    right: 0px;
    width: 100vw;
    height: 30px;

    z-index: 2000;
    -webkit-app-region: drag;

    float: right;
}

.closeWindow,
.maxWindow,
.hiddenWindow {
    width: 40px;
    height: 100%;
    transition: 0.4s;
    float: right;

    display: flex;
    justify-content: center;
    align-items: center;

    -webkit-app-region: no-drag;
}
.closeWindow:hover {
    transition: 0.4s;
    background-color: rgb(216, 29, 29);
}
.maxWindow:hover {
    transition: 0.4s;
    background-color: rgb(221, 221, 221);
}
.hiddenWindow:hover {
    transition: 0.4s;
    background-color: rgb(221, 221, 221);
}

.closeWindowLogo,
.closeWindowLogoHover,
.maxWindowLogo,
.maxWindowLogoHover,
.hiddenWindowLogo,
.hiddenWindowLogoHover {
    transition: 1s cubic-bezier(0.01, 0.94, 0.28, 0.98);

    width: 20px;
    height: 20px;

    object-fit: cover;
    position: relative;
    pointer-events: none;
}

.closeWindowLogoHover {
    transform: rotate(360deg);
}
.maxWindowLogoHover {
}
.hiddenWindowLogoHover {
}

.toolButtonsTran-enter,
.toolButtonsTran-leave-to {
    opacity: 0;
}
.toolButtonsTran-enter-active,
.toolButtonsTran-leave-active {
    transition: opacity 0.4s;
}
</style>
