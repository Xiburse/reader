<template>
    <div>
        <div :class="sideBarStartClass">
            <side-bar-column text="添加书籍" :method="addBookMethod" logoSrc="static/addBook.svg"></side-bar-column>
            <div class="lineBox">
                <div class="line"></div>
            </div>
            <side-bar-column text="设置" :method="settingsMethod" logoSrc="static/settings.svg"></side-bar-column>
        </div>
    </div>
</template>

<script>
import BookListMessage from "@/modules/BookListMessage"
import SideBarColumn from "./SideBarColumn.vue"

export default {
    name: "SideBar",
    components: {
        SideBarColumn
    },
    computed: {
        sideBarStartClass: function () {
            return "sideBarStart" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    data: function () {
        return {
            sideBarBoxStyle: {},
            addBookStyle: {
                transform: "scale(1, 1)"
            },
            addBookMethod: function () {
                BookListMessage.addBookFromDialog()
            },
            settingsMethod: function () {
                this.$router.push({name: "Settings"})
            }
        }
    },
    methods: {
        addBookDown: function () {
            this.addBookStyle.transform = "scale(0.9, 0.9)"
        },
        addBookUp: function () {
            this.addBookStyle.transform = "scale(1, 1)"
            BookListMessage.addBookFromDialog()
        },
        addBookEnter: function () {
            this.addBookStyle.transform = "scale(1.05, 1.05)"
        },
        addBookLeave: function () {
            this.addBookStyle.transform = "scale(1, 1)"
        }
    },
    created: function () { },
    mounted: function () { }
}
</script>

<style>
.sideBarStart,
.sideBarStartBlack {
    width: 300px;
    height: 100vh;

    background-color: rgba(255, 255, 255, 0.664);
    backdrop-filter: saturate(2000%) blur(35px);
    box-sizing: border-box;
    padding: 20px;
}
.sideBarStartBlack {
    background-color: rgba(0, 0, 0, 0.664);
}

.lineBox {
    padding: 20px;
}
.line,
.lineBlack {
    background-color: rgba(0, 0, 0, 0.479);
    width: 100%;
    height: 2px;
}
.lineBlack {
    background-color: rgba(255, 255, 255, 0.479);
}
</style>
