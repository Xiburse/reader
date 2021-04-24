<template>
    <transition name="moveBackgroundTran">
        <div :class="moveBackgroundBoxClass"
             :style="moveBackgroundBoxStyle"
             ref="moveBackground"
             v-if="moveBackgroundIf"></div>
    </transition>
</template>
<script>
export default {
    name: "MoveBackground",
    components: {},
    props: {},
    methods: {},
    computed: {
        ifChange: function () {
            return this.$store.state.moveBackgroundProp.change
        },
        moveBackgroundIf: function () {
            return this.$store.state.moveBackgroundProp.moveBackgroundIf
        },
        moveBackgroundBoxClass: function () {
            return "moveBackgroundBox" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    watch: {
        ifChange: function () {
            this.moveBackgroundBoxStyle.width = this.$store.state.moveBackgroundProp.width + "px"
            this.moveBackgroundBoxStyle.height = this.$store.state.moveBackgroundProp.height + "px"

            this.moveBackgroundBoxStyle.transform = "translate(" + this.$store.state.moveBackgroundProp.left + "px," + this.$store.state.moveBackgroundProp.top + "px)"
        }
    },
    data: function () {
        return {
            moveBackgroundBoxStyle: {
                width: "0px",
                height: "0px",
                left: "0px",
                top: "0px",
                transform: ""
            }
        }
    },
    mounted: function () {

    },
    created: function () {

    }
}
</script>
<style>
.moveBackgroundBox,
.moveBackgroundBoxBlack {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    transition: .3s cubic-bezier(.01,.97,.3,.99);
}
.moveBackgroundBoxBlack {
    background-color: rgba(255, 255, 255, 0.2);
}

.moveBackgroundTran-enter,
.moveBackgroundTran-leave-to {
    opacity: 0;
}
</style>
