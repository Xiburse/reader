<template>
    <div class="contentsBox">
        <contents-child v-for="l in list.list" :list="l" :level="0" :key="l.id"></contents-child>
    </div>
</template>

<script>
import ContentsChild from "./ContentsChild.vue"

export default {
    name: "Contents",
    components: {
        ContentsChild
    },
    methods: {},
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

    background-color: rgba(255, 255, 255, 0.664);
    backdrop-filter: saturate(2000%) blur(35px);
    box-sizing: border-box;

    background-color: rgb(214, 214, 214);
}
</style>
