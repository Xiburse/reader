<template>
    <div :class="doubleButtonBoxClass"
         :style="doubleButtonBoxStyle"
         @mouseenter="doubleButtonEnter"
         @mouseleave="doubleButtonLeave">
        <div class="circleButton"
             :style="circleButtonStyle"></div>
    </div>
</template>
<script>
export default {
    name: "DoubleButton",
    components: {},
    props: {
        height: Number,
        ifClick: Boolean
    },
    methods: {
        doubleButtonEnter: function () {
            this.doubleButtonBoxClass = "doubleButtonBoxHover"
        },
        doubleButtonLeave: function () {
            this.doubleButtonBoxClass = "doubleButtonBox"
        }
    },
    watch: {
        ifClick: function () {
            this.circleButtonStyle.margin = this.ifClick ? "2px 2px 2px " + (this.height + 2) + "px" : "2px"
        }
    },
    data: function () {
        return {
            doubleButtonBoxStyle: {
                height: this.height + "px",
                width: this.height * 2 + "px"
            },
            doubleButtonBoxClass: "doubleButtonBox",
            circleButtonStyle: {
                height: this.height - 4 + "px",
                width: this.height - 4 + "px",
                margin: this.ifClick ? "2px 2px 2px " + (this.height + 2) + "px" : "2px"
            }
        }
    },
    created: function () {

    },
    mounted: function () {

    }
}
</script>
<style>
.doubleButtonBox,
.doubleButtonBoxHover {
    display: inline-block;

    border-radius: 999px;
    transition: 0.4s;
    background-color: rgb(170, 170, 170);
    box-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);
}
.doubleButtonBoxHover {
    box-shadow: 2px 2px 20px rgba(119, 119, 119, 0.459);
}

.circleButton {
    float: left;
    transition: 0.4s cubic-bezier(0, 0.82, 0.16, 0.99);
    background-color: rgb(58, 58, 58);
    border-radius: 999px;
    text-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);
}
</style>