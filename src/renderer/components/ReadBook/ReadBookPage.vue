<template>
    <div class="readBookPageBox">{{nid}}, {{path}}</div>
</template>

<script>
import {remote} from "electron"

export default {
    name: "ReadBookPage",
    components: {},
    methods: {},
    data: function () {
        return {
            nid: "",
            path: ""
        }
    },
    created: function () {
        this.nid = this.$route.params.nid
        this.path = remote.getGlobal("cachePath") + "\\" + this.nid
    },
    mounted: function () {
        
    }
}
</script>
<style>
.readBookPageBox {

}
</style>
