<template>
    <div :class="doubleButtonBoxClass"
         :style="doubleButtonBoxStyle"
         @mouseenter="doubleButtonEnter"
         @mouseleave="doubleButtonLeave">
        <div :class="circleButtonClass"
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
            this.doubleButtonBoxClass = "doubleButtonBoxHover" + (this.$store.state.ifBlack ? "Black" : "")
        },
        doubleButtonLeave: function () {
            this.doubleButtonBoxClass = "doubleButtonBox" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    computed: {
        circleButtonClass: function () {
            return "circleButton" + (this.$store.state.ifBlack ? "Black" : "")
        },
        ifBlack: function () {
            return this.$store.state.ifBlack
        }
    },
    watch: {
        ifClick: function () {
            this.circleButtonStyle.margin = this.ifClick ? "2px 2px 2px " + (this.height + 2) + "px" : "2px"
        },
        ifBlack: function () {
            if(!this.ifBlack) {
                this.doubleButtonBoxClass = this.doubleButtonBoxClass.split("Black")[0]
            } else {
                this.doubleButtonBoxClass += "Black"
            }
        }
    },
    data: function () {
        return {
            doubleButtonBoxStyle: {
                height: this.height + "px",
                width: this.height * 2 + "px"
            },
            doubleButtonBoxClass: "doubleButtonBox" + (this.$store.state.ifBlack ? "Black" : ""),
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
.doubleButtonBoxHover,
.doubleButtonBoxBlack,
.doubleButtonBoxHoverBlack {
    display: inline-block;

    border-radius: 999px;
    transition: 0.4s;
    background-color: rgb(170, 170, 170);
    box-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);
}
.doubleButtonBoxHover {
    box-shadow: 2px 2px 20px rgba(119, 119, 119, 0.459);
}
.doubleButtonBoxBlack {
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 2px 2px 20px rgba(119, 119, 119, 0.459);
}
.doubleButtonBoxHoverBlack {
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);
}

.circleButton,
.circleButtonBlack {
    float: left;
    transition: 0.4s cubic-bezier(0, 0.82, 0.16, 0.99);
    background-color: rgb(22, 22, 22);
    border-radius: 999px;
    text-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);
}
.circleButtonBlack {
    background-color: rgba(255, 255, 255, 0.6);
}
</style>