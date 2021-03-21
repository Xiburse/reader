<template>
    <div class="readBookPageBox">
        <contents :list="list"></contents>
    </div>
</template>

<script>
import {remote} from "electron"
import Contents from "./Contents.vue"

export default {
    name: "ReadBookPage",
    components: {
        Contents
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
    },
    mounted: function () {
        
    }
}
</script>
<style>
.readBookPageBox {

}
</style>
