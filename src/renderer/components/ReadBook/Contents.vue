<template>
    <div :class="contentsBoxClass"
         @mouseleave="contentsBoxMouseLeave">
        <div class="contentsChildBox">
            <contents-child v-for="l in list.list"
                            :list="l"
                            :level="0"
                            :key="l.id"></contents-child>
        </div>
        <div class="contentsReturnButtonBox">
            <expand-round-button class="contentsReturnButton"
                                 :width="50"
                                 expandLogoPath="static/return.svg"
                                 :ifClick="roundButtonClick"
                                 @click.native="contentsReturnButtonClick"></expand-round-button>
        </div>
    </div>
</template>

<script>
import { remote } from "electron"
import ContentsChild from "./ContentsChild.vue"
import ExpandRoundButton from "./ExpandRoundButton.vue"
import UpdateReadingBook from "@/modules/UpdateReadingBook"

export default {
    name: "Contents",
    components: {
        ContentsChild,
        ExpandRoundButton
    },
    computed: {
        contentsBoxClass: function () {
            return "contentsBox" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    methods: {
        contentsBoxMouseLeave: function () {
            this.$store.commit("setMoveBackgroundPropIf", false)
        },
        contentsReturnButtonClick: function () {
            UpdateReadingBook.save(this.nid, this.iframeSrc, remote.getGlobal("iframeOptions").b)
            this.$router.push({ name: "Page" })
        },

        enter: function () {
            console.log(2333)
        }
    },
    props: {
        nid: String,
        iframeSrc: String,
        list: Object
    },
    data: function () {
        return {
            roundButtonClick: false
        }
    },
    mounted: function () { },
    created: function () { }
}
</script>

<style>
.contentsBox,
.contentsBoxBlack {
    width: 300px;
    height: 100vh;

    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(2000%) blur(35px);
    box-sizing: border-box;

    overflow-y: scroll;
    overflow-x: hidden;
}
.contentsBoxBlack {
    background-color: rgba(0, 0, 0, 0.5);
}

.contentsChildBox {
    margin-bottom: 10vh;
}

.contentsReturnButtonBox {
    margin-bottom: 5vh;
}
.contentsReturnButton {
    margin: 0px auto;
}
</style>
