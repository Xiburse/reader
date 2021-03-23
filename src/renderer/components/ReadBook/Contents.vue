<template>
    <div class="contentsBox"
         @mouseleave="contentsBoxMouseLeave">
        <contents-child v-for="l in list.list"
                        :list="l"
                        :level="0"
                        :key="l.id"></contents-child>
    </div>
</template>

<script>
import ContentsChild from "./ContentsChild.vue"

export default {
    name: "Contents",
    components: {
        ContentsChild
    },
    methods: {
        contentsBoxMouseLeave: function () {
            this.$store.commit("setMoveBackgroundPropIf", false)
        }
    },
    props: {
        list: Object
    },
    data: function () {
        return {}
    },
    mounted: function () { },
    created: function () { }
}
</script>

<style>
.contentsBox {
    width: 300px;
    height: 100vh;

    background-color: rgba(200, 200, 200, 0.5);
    backdrop-filter: saturate(2000%) blur(35px);
    box-sizing: border-box;

    overflow-y: scroll;
    overflow-x: hidden;
}
</style>
