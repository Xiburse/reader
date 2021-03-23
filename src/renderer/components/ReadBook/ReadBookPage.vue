<template>
    <div class="readBookPageBox">
        <contents :list="list"></contents>

        <move-background style="pointer-events:none"></move-background>
    </div>
</template>

<script>
import { remote } from "electron"
import Contents from "./Contents.vue"
import MoveBackground from "../MoveBackground.vue"

export default {
    name: "ReadBookPage",
    components: {
        Contents,
        MoveBackground
    },
    methods: {},
    data: function () {
        return {
            nid: "",
            path: "",
            list: Object
        }
    },
    created: function () {
        this.nid = this.$route.params.nid
        this.path = remote.getGlobal("cachePath") + "\\" + this.nid
        this.list = this.$route.params.list
        console.log(this.list)

        this.$store.commit("setMoveBackgroundProp", { "width": "0", "height": "2", "left": "0", "top": "0", "change": false })
        console.log(this.$store.state.moveBackgroundProp)
        this.$store.commit("setMoveBackgroundPropIf", false)
    },
    mounted: function () {

    }
}
</script>
<style>
.readBookPageBox {
    position: fixed;
}
</style>
