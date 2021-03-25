<template>
    <div class="contentsBox"
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
import ContentsChild from "./ContentsChild.vue"
import ExpandRoundButton from "./ExpandRoundButton.vue"

export default {
    name: "Contents",
    components: {
        ContentsChild,
        ExpandRoundButton
    },
    methods: {
        contentsBoxMouseLeave: function () {
            this.$store.commit("setMoveBackgroundPropIf", false)
        },
        contentsReturnButtonClick: function () {
            this.$router.push({name: "Page"})
        },

        enter: function () {
            console.log(2333)
        }
    },
    props: {
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
.contentsBox {
    width: 300px;
    height: 100vh;

    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(2000%) blur(35px);
    box-sizing: border-box;

    overflow-y: scroll;
    overflow-x: hidden;
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
